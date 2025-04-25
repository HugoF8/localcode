const request = require('supertest');
const app = require('../../src/app');
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
                data_nascimento: new Date("1990-05-10").toISOString()
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

    test('Falha ao criar utilizador com dados inválidos', async () => {
        const res = await request(app)
            .post('/api/utilizadores/criarUtilizador')
            .send({
                nome: "", // nome inválido
                email: "emailinvalido", // email inválido
                password: "", // password inválida
                data_nascimento: "not-a-date" // data inválida
            });
    
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
        expect(res.body).toHaveProperty('error');
    });

    test('Falha ao criar utilizador com email já registado', async () => {
        // Cria primeiro
        await request(app).post('/api/utilizadores/criarUtilizador').send({
            nome: "Repetido",
            email: "email@duplicado.com",
            password: "123456",
            data_nascimento: new Date("1990-01-01").toISOString()
        });
    
        // Tenta criar de novo
        const res = await request(app).post('/api/utilizadores/criarUtilizador').send({
            nome: "Outro",
            email: "email@duplicado.com",
            password: "654321",
            data_nascimento: new Date("1995-01-01").toISOString()
        });
    
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
        expect(res.body).toHaveProperty('error');
    });
    
    test('Falha ao criar utilizador com data de nascimento no futuro', async () => {
        const futureDate = new Date();
        futureDate.setFullYear(futureDate.getFullYear() + 1);
    
        const res = await request(app).post('/api/utilizadores/criarUtilizador').send({
            nome: "Futuro",
            email: "futuro@email.com",
            password: "123456",
            data_nascimento: futureDate.toISOString()
        });
    
        expect(res.statusCode).toBeGreaterThanOrEqual(400);
    });
    

    test('Token inválido não permite acesso à lista de utilizadores', async () => {
        const res = await request(app)
            .get('/api/utilizadores/verUtilizadores')
            .set('Authorization', 'Bearer token-falso');
    
        expect(res.statusCode).toBe(403);
        expect(res.body).toHaveProperty('error', 'Token inválido');
    });

});
