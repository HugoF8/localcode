const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

describe('Testes Integração – Autenticação', () => {
  beforeAll(async () => {
    // Limpar dados antigos
    await prisma.perfil.deleteMany();
    await prisma.utilizador.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const utilizador = {
    nome: 'Teste',
    email: 'teste@gmail.com',
    password: 'password123',
    data_nascimento: '1990-05-15'
  };

  test('Registar novo utilizador com dados válidos', async () => {
    const res = await request(app)
      .post('/api/autent/registar')
      .send(utilizador);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('utilizador');
    expect(res.body.utilizador).toMatchObject({
      email: utilizador.email,
      name: utilizador.nome
    });
  });

  test('Falhar registar com dados inválidos', async () => {
    const res = await request(app)
      .post('/api/autent/registar')
      .send({
        nome: '',
        email: 'invalido.com',
        password: '',
        data_nascimento: 'data'
      });
  
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Falhar registar com email duplicado', async () => {
    const res = await request(app)
      .post('/api/autent/registar')
      .send(utilizador);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Login com credenciais válidas', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: utilizador.email, password: utilizador.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
    expect(res.body).toHaveProperty('utilizador');
    expect(res.body.utilizador.email).toBe(utilizador.email);
  });

  test('Token retornado no login é um JWT válido', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: utilizador.email, password: utilizador.password });

    expect(res.statusCode).toBe(200);

    const decoded = jwt.verify(res.body.token, JWT_SECRET);
    expect(decoded).toHaveProperty('utilizadorId');
    expect(decoded).toHaveProperty('tipo_utilizador');
  });

  test('Falhar login com campos vazios', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: '', password: '' });
  
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
  
  test('Falhar login com passe incorreta', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: utilizador.email, password: 'pass-errada' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });

  test('Falhar login com email inexistente', async () => {
    const res = await request(app)
      .post('/api/autent/login')
      .send({ email: 'inexistente@gmail.com', password: 'any' });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});
