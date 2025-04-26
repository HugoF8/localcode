const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const JWT_SECRET = 'supersecreto';

let tokenModerador;
let tokenNormal;
let utilizadorModerador;
let utilizadorNormal;
let ticket;

beforeAll(async () => {
    await prisma.resposta_ticket.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.utilizador.deleteMany();
    await prisma.moderador_pagina.deleteMany();
    await prisma.pagina_freguesia.deleteMany();
    await prisma.morada.deleteMany();

    const morada = await prisma.morada.create({
        data: {
            cidade: 'Cidade Teste',
            codigo_postal: 1234,
        }
    });

    utilizadorModerador = await prisma.utilizador.create({
        data: {
            nome: "Moderador",
            email: "mod@gmail.com",
            password: "123456",
            data_nascimento: new Date("1990-01-01"),
            tipo_utilizador: "moderador"
        },
    });

    utilizadorNormal = await prisma.utilizador.create({
        data: {
            nome: "Utilizador",
            email: "utilizador@gmail.com",
            password: "123456",
            data_nascimento: new Date("1995-01-01")
        },
    });

    const pagina = await prisma.pagina_freguesia.create({
        data: {
            nome_pagina: "Página Teste",
            descricao: "Descrição",
            id_morada: morada.id_morada,
            id_utilizador: utilizadorModerador.id_utilizador
        }
    });

    await prisma.moderador_pagina.create({
        data: {
            id_utilizador: utilizadorModerador.id_utilizador,
            id_pagina: pagina.id_pagina,
            funcao: 'moderador'
        }
    });

    ticket = await prisma.ticket.create({
        data: {
            id_utilizador: utilizadorNormal.id_utilizador,
            id_pagina: pagina.id_pagina,
            descricao_problema: "Problema teste",
            estado_ticket: "pendente"
        }
    });

    tokenModerador = jwt.sign({
        utilizadorId: utilizadorModerador.id_utilizador,
        tipo_utilizador: utilizadorModerador.tipo_utilizador,
        email: utilizadorModerador.email
    }, JWT_SECRET, { expiresIn: '1h' });

    tokenNormal = jwt.sign({
        utilizadorId: utilizadorNormal.id_utilizador,
        tipo_utilizador: utilizadorNormal.tipo_utilizador,
        email: utilizadorNormal.email
    }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Testes Integração - Resposta Ticket', () => {
    test('Criar resposta (moderador)', async () => {
        const res = await request(app)
            .post('/api/respostasTickets/criarResposta')
            .set('Authorization', `Bearer ${tokenModerador}`)
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorModerador.id_utilizador,
                conteudo_resposta: "Resposta feita.",
                estado_resposta: "resolvido"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id_resposta');
        expect(res.body.estado_resposta).toBe('resolvido');
    });

    test('Buscar todas as respostas', async () => {
        const res = await request(app)
            .get('/api/respostasTickets/verRespostas')
            .set('Authorization', `Bearer ${tokenModerador}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Buscar respostas por utilizador', async () => {
        const res = await request(app)
            .get(`/api/respostasTickets/verRespostas/${utilizadorModerador.id_utilizador}`)
            .set('Authorization', `Bearer ${tokenModerador}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Verificar estado do ticket após resposta resolvida', async () => {
        await request(app)
            .post('/api/respostasTickets/criarResposta')
            .set('Authorization', `Bearer ${tokenModerador}`)
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorModerador.id_utilizador,
                conteudo_resposta: "Ticket fechado",
                estado_resposta: "resolvido"
            });
    
        const ticketAtualizado = await prisma.ticket.findUnique({
            where: { id_ticket: ticket.id_ticket }
        });
    
        expect(ticketAtualizado.estado_ticket).toBe('fechado');
    });
    
    test('Verificar criação de notificação após resposta', async () => {
        const resposta = await request(app)
            .post('/api/respostasTickets/criarResposta')
            .set('Authorization', `Bearer ${tokenModerador}`)
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorModerador.id_utilizador,
                conteudo_resposta: "Com notificação",
                estado_resposta: "resolvido"
            });
    
        const notificacao = await prisma.notificacao.findFirst({
            where: {
                id_ticket: ticket.id_ticket,
                tipo_notificacao: 'Sucesso'
            }
        });
    
        expect(notificacao).not.toBeNull();
    });
    
    test('Falhar ao criar resposta sem estado_resposta', async () => {
        const res = await request(app)
            .post('/api/respostasTickets/criarResposta')
            .set('Authorization', `Bearer ${tokenModerador}`)
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorModerador.id_utilizador,
                conteudo_resposta: "Sem estado"
            });
    
        expect(res.statusCode).toBe(500);
    });
    
    test('Falhar ao criar resposta sem token', async () => {
        const res = await request(app)
            .post('/api/respostasTickets/criarResposta')
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorModerador.id_utilizador,
                conteudo_resposta: "Tentativa sem token",
                estado_resposta: "nao_resolvido"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Token não fornecido');
    });

    test('Falhar ao criar resposta com utilizador não moderador', async () => {
        const res = await request(app)
            .post('/api/respostasTickets/criarResposta')
            .set('Authorization', `Bearer ${tokenNormal}`)
            .send({
                id_ticket: ticket.id_ticket,
                id_utilizador: utilizadorNormal.id_utilizador,
                conteudo_resposta: "Utilizador normal a tentar responder",
                estado_resposta: "resolvido"
            });

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
    });
});
