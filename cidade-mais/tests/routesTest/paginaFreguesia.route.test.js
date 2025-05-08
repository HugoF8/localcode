const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let utilizador;
let morada;
let paginaAlpha;
let paginaBeta;

beforeAll(async () => {
  await prisma.pagina_freguesia.deleteMany();
  await prisma.utilizador.deleteMany();
  await prisma.morada.deleteMany();

  utilizador = await prisma.utilizador.create({
    data: {
      nome: "Teste",
      email: "teste@gmail.com",
      password: "123456",
      data_nascimento: new Date("1990-01-01"),
    }
  });

  morada = await prisma.morada.create({
    data: {
      cidade: "Cidade Teste",
      codigo_postal: 12345,
    }
  });

  // Criar duas páginas para pesquisa
  paginaAlpha = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: "Pagina Alpha",
      descricao: "Descrição Alpha",
      id_morada: morada.id_morada,
      id_utilizador: utilizador.id_utilizador,
    }
  });

  paginaBeta = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: "Pagina Beta",
      descricao: "Descrição Beta",
      id_morada: morada.id_morada,
      id_utilizador: utilizador.id_utilizador,
    }
  });

  token = jwt.sign({
    utilizadorId: utilizador.id_utilizador,
    tipo_utilizador: utilizador.tipo_utilizador,
    email: utilizador.email
  }, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testes Integração - Página Freguesia', () => {

  test('Criar nova página de freguesia', async () => {
    const res = await request(app)
      .post('/api/paginaFreguesias/criarPaginaFreguesia')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome_pagina: "Pagina Gamma",
        descricao: "Descrição Gamma",
        id_morada: morada.id_morada,
        id_utilizador: utilizador.id_utilizador
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_pagina');
    expect(res.body.nome_pagina).toBe("Pagina Gamma");
  });

  test('Listar todas as páginas de freguesia', async () => {
    const res = await request(app)
      .get('/api/paginaFreguesias/verPaginaFreguesia')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(3); // Alpha, Beta e Gamma
  });

  test('Pesquisar páginas por nome', async () => {
    const res = await request(app)
      .get('/api/paginaFreguesias/pesquisarPaginas/alpha') // corrigido
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nome_pagina).toBe("Pagina Alpha");
  });

  test('Pesquisar com termo sem correspondência', async () => {
    const res = await request(app)
      .get('/api/paginaFreguesias/pesquisarPaginas/delta') // corrigido
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  test('Falhar criar página com nome vazio', async () => {
    const res = await request(app)
      .post('/api/paginaFreguesias/criarPaginaFreguesia')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome_pagina: "   ",
        descricao: "Descrição inválida",
        id_morada: morada.id_morada,
        id_utilizador: utilizador.id_utilizador
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'O nome da página é obrigatório');
  });

  test('Falhar listar sem token', async () => {
    const res = await request(app)
      .get('/api/paginaFreguesias/verPaginaFreguesia');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido');
  });

  test('Falhar com token inválido', async () => {
    const res = await request(app)
      .get('/api/paginaFreguesias/verPaginaFreguesia')
      .set('Authorization', 'Bearer token-invalido');

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Token inválido');
  });

});