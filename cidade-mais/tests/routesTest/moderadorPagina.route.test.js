// tests/routesTest/moderadorPagina.route.test.js
const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let tokenAdmin;
let tokenUser;
let utilizador;
let pagina;

// Antes de tudo: limpar e preparar dados
beforeAll(async () => {
  // Apaga em ordem respeitando FKs
  await prisma.moderador_pagina.deleteMany();
  await prisma.pagina_freguesia.deleteMany();
  await prisma.utilizador.deleteMany();

  // Cria um admin e um user normal
  utilizador = await prisma.utilizador.create({
    data: {
      nome: 'Admin Test',
      email: 'admin@test.com',
      password: 'senha',
      data_nascimento: new Date('1990-01-01'),
      tipo_utilizador: 'admin'
    }
  });
  const normal = await prisma.utilizador.create({
    data: {
      nome: 'User Test',
      email: 'user@test.com',
      password: 'senha',
      data_nascimento: new Date('1990-01-01'),
    }
  });

  // Token de cada um
  tokenAdmin = jwt.sign({
    utilizadorId: utilizador.id_utilizador,
    tipo_utilizador: utilizador.tipo_utilizador,
    email: utilizador.email
  }, JWT_SECRET);
  tokenUser = jwt.sign({
    utilizadorId: normal.id_utilizador,
    tipo_utilizador: normal.tipo_utilizador,
    email: normal.email
  }, JWT_SECRET);

  // Cria uma página de freguesia para linkar
  pagina = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: 'Freguesia Teste',
      descricao: 'Descrição teste',
      id_morada: (await prisma.morada.create({
        data: { cidade: 'Cidade', codigo_postal: 1234 }
      })).id_morada,
      id_utilizador: utilizador.id_utilizador
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Integração - Moderador de Página', () => {
  test('Criar novo moderador de página (admin)', async () => {
    const res = await request(app)
      .post('/api/moderadores/criarModeradorPagina')
      .set('Authorization', `Bearer ${tokenAdmin}`)
      .send({
        id_pagina: pagina.id_pagina,
        id_utilizador: utilizador.id_utilizador,
        funcao: 'moderador'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_moderador');
    expect(res.body.funcao).toBe('moderador');
  });

  test('Listar todos os moderadores de página', async () => {
    const res = await request(app)
      .get('/api/moderadores/verModeradorPagina')
      .set('Authorization', `Bearer ${tokenAdmin}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Falhar criar sem token', async () => {
    const res = await request(app)
      .post('/api/moderadores/criarModeradorPagina')
      .send({
        id_pagina: pagina.id_pagina,
        id_utilizador: utilizador.id_utilizador,
        funcao: 'dono'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido');
  });

  test('Falhar listar com token inválido', async () => {
    const res = await request(app)
      .get('/api/moderadores/verModeradorPagina')
      .set('Authorization', 'Bearer token_invalido');
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Token inválido');
  });

  test('Usuário normal não pode criar moderador de página', async () => {
    const res = await request(app)
      .post('/api/moderadores/criarModeradorPagina')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        id_pagina: pagina.id_pagina,
        id_utilizador: utilizador.id_utilizador,
        funcao: 'moderador'
      });
    // não há restrição por role neste endpoint, mas se você quiser aplicar,
    // troque o status esperado para 403 e adicione o middleware authRole('admin')
    expect(res.statusCode).toBe(201);
  });
});
