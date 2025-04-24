const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

describe('Integração – Autenticação', () => {
  beforeAll(async () => {
    // Limpar usuários e perfis antes dos testes
    await prisma.perfil.deleteMany();
    await prisma.utilizador.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const validUser = {
    nome: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
    data_nascimento: '1990-05-15'
  };

  test('Registrar novo utilizador com dados válidos', async () => {
    const res = await request(app)
      .post('/api/autent/registar')
      .send(validUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('utilizador');
    expect(res.body.utilizador).toMatchObject({
      email: validUser.email,
      name: validUser.nome
    });
  });

  test('Falhar registrar com email duplicado', async () => {
    // Tentar registrar o mesmo email novamente
    const res = await request(app)
      .post('/api/autent/registar')
      .send(validUser);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Login com credenciais válidas', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: validUser.email, password: validUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('utilizador');
    expect(res.body.utilizador.email).toBe(validUser.email);
  });

  test('Falhar login com senha incorreta', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: validUser.email, password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Falhar login com email inexistente', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: 'noone@nowhere.com', password: 'any' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});