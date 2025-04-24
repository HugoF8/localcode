const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let utilizador;

beforeAll(async () => {
  // 1) Deleta páginas que referenciam morada (para não violar FK)
  await prisma.pagina_freguesia.deleteMany();

  // 2) Agora sim, deleta moradas
  await prisma.morada.deleteMany();

  // 3) Deleta utilizadores
  await prisma.utilizador.deleteMany();

  // Cria um utilizador só para gerar o token
  utilizador = await prisma.utilizador.create({
    data: {
      nome: "Morada Tester",
      email: "morada@exemplo.com",
      password: "123456",
      data_nascimento: new Date("1990-01-01")
    }
  });

  // Gera JWT
  token = jwt.sign({
    utilizadorId: utilizador.id_utilizador,
    tipo_utilizador: utilizador.tipo_utilizador,
    email: utilizador.email
  }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Integração – Morada', () => {

  test('Criar nova morada', async () => {
    const res = await request(app)
      .post('/api/moradas/criarMorada')
      .set('Authorization', `Bearer ${token}`)
      .send({
        freguesia: "Freguesia Teste",
        cidade: "Cidade Teste",
        rua: "Rua 123",
        codigo_postal: 1000
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_morada');
    expect(res.body.cidade).toBe("Cidade Teste");
    expect(res.body.codigo_postal).toBe(1000);
  });

  test('Listar todas as moradas', async () => {
    const res = await request(app)
      .get('/api/moradas/verMorada')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Falhar criar morada sem token', async () => {
    const res = await request(app)
      .post('/api/moradas/criarMorada')
      .send({
        cidade: "Cidade Sem Token",
        codigo_postal: 2000
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido');
  });

  test('Falhar listar moradas com token inválido', async () => {
    const res = await request(app)
      .get('/api/moradas/verMorada')
      .set('Authorization', 'Bearer token-invalido');

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Token inválido');
  });

});
