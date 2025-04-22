const request = require('supertest');
const app = require('../app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const JWT_SECRET = 'supersecreto'; // igual ao usado no middleware

let token;
let utilizadorId;

beforeAll(async () => {
    // Limpar base de dados antes do teste
    await prisma.utilizador.deleteMany();

    // Criar utilizador de teste para autenticação
    const user = await prisma.utilizador.create({
        data: {
            nome: "Test User",
            email: "testuser@email.com",
            password: "123456", // considera usar hash se bcrypt estiver implementado
            data_nascimento: new Date("2000-01-01"),
        },
    });

    utilizadorId = user.id_utilizador;

    token = jwt.sign({
        utilizadorId: user.id_utilizador,
        tipo_utilizador: user.tipo_utilizador,
        email: user.email,
    }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
    await prisma.$disconnect();
});

describe('Testes de integração: Utilizador', () => {

    test('Criar novo utilizador', async () => {
        const res = await request(app)
            .post('/api/utilizadores/criarUtilizador')
            .send({
                nome: "Novo Utilizador",
                email: "novo@email.com",
                password: "senha123",
                data_nascimento: "1990-05-10",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id_utilizador');
        expect(res.body.email).toBe("novo@email.com");
    });

    test('Buscar todos os utilizadores (com token)', async () => {
        const res = await request(app)
            .get('/api/utilizadores/verUtilizadores')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });

    test('Alterar tipo de utilizador', async () => {
        const res = await request(app)
            .patch('/api/utilizadores/alterarUtilizadores')
            .send({
                id_utilizador: utilizadorId,
                tipo: 'moderador'
            });

        expect(res.statusCode).toBe(200);
        expect(res.body.tipo_utilizador).toBe('moderador');
    });

    test('Falhar buscar utilizadores sem token', async () => {
        const res = await request(app)
            .get('/api/utilizadores/verUtilizadores');

        expect(res.statusCode).toBe(401);
        expect(res.body).toHaveProperty('error', 'Token não fornecido');
    });

});
