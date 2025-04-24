const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let tokenUser, tokenAdmin;
let utilizadorUser, utilizadorAdmin;
let pedido;

beforeAll(async () => {
    await prisma.pedido_pagina.deleteMany();
    await prisma.utilizador.deleteMany();
    await prisma.morada.deleteMany();

    const morada = await prisma.morada.create({
        data: {
            cidade: 'Cidade Teste',
            codigo_postal: 1234
        }
    });

    utilizadorUser = await prisma.utilizador.create({
        data: {
            nome: "User",
            email: "user@email.com",
            password: "123456",
            data_nascimento: new Date("1990-01-01"),
            tipo_utilizador: "utilizador",
            id_morada: morada.id_morada
        }
    });

    utilizadorAdmin = await prisma.utilizador.create({
        data: {
            nome: "Admin",
            email: "admin@email.com",
            password: "123456",
            data_nascimento: new Date("1990-01-01"),
            tipo_utilizador: "admin"
        }
    });

    tokenUser = jwt.sign({
        utilizadorId: utilizadorUser.id_utilizador,
        tipo_utilizador: utilizadorUser.tipo_utilizador,
        email: utilizadorUser.email
    }, JWT_SECRET, { expiresIn: '1h' });

    tokenAdmin = jwt.sign({
        utilizadorId: utilizadorAdmin.id_utilizador,
        tipo_utilizador: utilizadorAdmin.tipo_utilizador,
        email: utilizadorAdmin.email
    }, JWT_SECRET, { expiresIn: '1h' });

    pedido = await prisma.pedido_pagina.create({
        data: {
            id_utilizador: utilizadorUser.id_utilizador,
            id_morada: morada.id_morada,
            nomefreguesia: 'Freguesia Teste',
            dados_comprovacao: 'Comprovação inicial',
        }
    });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Integração - Pedido Página', () => {

    test('Criar pedido de página', async () => {
        const res = await request(app)
            .post('/api/pedidosPagina/criarPedido')
            .set('Authorization', `Bearer ${tokenUser}`)
            .send({
                id_utilizador: utilizadorUser.id_utilizador,
                id_morada: utilizadorUser.id_morada,
                dados_comprovacao: "Documento teste",
                nomefreguesia: "Nova Freguesia"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id_pedido');
    });

    test('Listar todos os pedidos (admin)', async () => {
        const res = await request(app)
            .get('/api/pedidosPagina/verPedidos')
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Listar pedidos pendentes (admin)', async () => {
        const res = await request(app)
            .get('/api/pedidosPagina/verPedidosPendentes')
            .set('Authorization', `Bearer ${tokenAdmin}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Atualizar estado do pedido (admin)', async () => {
        const res = await request(app)
            .patch(`/api/pedidosPagina/atualizarEstadoPedido/${pedido.id_pedido}`)
            .set('Authorization', `Bearer ${tokenAdmin}`)
            .send({ bol: true });

        expect(res.statusCode).toBe(200);
        expect(res.body.estado_pedido).toBe('aprovado');
    });

    test('Alterar pedido (proprietário)', async () => {
        const res = await request(app)
            .patch(`/api/pedidosPagina/alterarPedidoPagina/${pedido.id_pedido}`)
            .set('Authorization', `Bearer ${tokenUser}`)
            .send({ dados_comprovacao: "Documento atualizado" });

        expect(res.statusCode).toBe(200);
        expect(res.body.pedido.dados_comprovacao).toBe("Documento atualizado");
    });

    test('Acesso negado sem token', async () => {
        const res = await request(app)
            .get('/api/pedidosPagina/verPedidos');

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Token não fornecido');
    });

    test('Acesso negado a rota admin com utilizador normal', async () => {
        const res = await request(app)
            .get('/api/pedidosPagina/verPedidos')
            .set('Authorization', `Bearer ${tokenUser}`);

        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error');
    });

});
