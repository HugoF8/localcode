
const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const path = require('path');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let utilizadorId;

beforeAll(async () => {
    await prisma.perfil.deleteMany();
    await prisma.utilizador.deleteMany();

    const user = await prisma.utilizador.create({
        data: {
            nome: "Perfil Test",
            email: "perfil@email.com",
            password: "123456",
            data_nascimento: new Date("1990-01-01")
        },
    });

    utilizadorId = user.id_utilizador;

    await prisma.perfil.create({
        data: {
            id_utilizador: utilizadorId,
            biografia: "Bio de teste"
        }
    });

    token = jwt.sign({
        utilizadorId: user.id_utilizador,
        tipo_utilizador: user.tipo_utilizador,
        email: user.email
    }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Integração - Perfil', () => {

    test('Criar novo perfil', async () => {
        const res = await request(app)
            .post('/api/perfil/criarPerfil')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id_utilizador: utilizadorId,
                foto_perfil: null,
                foto_capa: null,
                biografia: "Nova biografia"
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id_perfil');
    });

    test('Buscar todos os perfis', async () => {
        const res = await request(app)
            .get('/api/perfil/verPerfil')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Atualizar foto de perfil', async () => {
        
        const res = await request(app)
            .patch('/api/perfil/foto-perfil')
            .set('Authorization', `Bearer ${token}`)
            .attach('imagem', path.resolve(__dirname, '../imagens/imagemteste.jpg'));
    
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('foto_perfil');
        expect(res.body.foto_perfil).toMatch(/uploads/);
    });

    test('Falhar criar perfil sem token', async () => {
        const res = await request(app)
            .post('/api/perfil/criarPerfil')
            .send({
                id_utilizador: utilizadorId,
                biografia: "Sem token"
            });

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Token não fornecido');
    });

    test('Falhar upload com utilizador inválido', async () => {
        const tokenFake = jwt.sign({
            utilizadorId: 999999, // ID inexistente
            tipo_utilizador: 'utilizador',
            email: 'fake@email.com'
        }, JWT_SECRET, { expiresIn: '1h' });

        const res = await request(app)
            .patch('/api/perfil/foto-perfil')
            .set('Authorization', `Bearer ${tokenFake}`)
            .attach('imagem', path.resolve(__dirname, '../imagens/imagemteste.jpg'));

        expect(res.statusCode).toBe(500);
        expect(res.body).toHaveProperty('error');
    });
});
