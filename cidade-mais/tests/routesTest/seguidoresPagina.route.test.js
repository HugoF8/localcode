const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let id_utilizador;
let id_pagina;

beforeAll(async () => {
  // Limpeza
  await prisma.seguidores_pagina.deleteMany();
  await prisma.pagina_freguesia.deleteMany();
  await prisma.utilizador.deleteMany();
  await prisma.morada.deleteMany();

  // Morada
  const morada = await prisma.morada.create({
    data: {
      freguesia: 'TesteFreguesia',
      cidade: 'TesteCidade',
      rua: 'Rua Teste',
      codigo_postal: 1234
    }
  });

  // Utilizador
  const utilizador = await prisma.utilizador.create({
    data: {
      nome: 'Seguidor Teste',
      email: 'seguidor@gmail.com',
      password: '1234',
      data_nascimento: new Date('2000-01-01'),
      tipo_utilizador: 'utilizador',
      id_morada: morada.id_morada
    }
  });

  id_utilizador = utilizador.id_utilizador;

  // Página
  const pagina = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: 'Página Seguir',
      id_morada: morada.id_morada,
      id_utilizador: utilizador.id_utilizador
    }
  });

  id_pagina = pagina.id_pagina;

  // Token
  token = jwt.sign(
    { utilizadorId: id_utilizador, tipo_utilizador: 'utilizador' },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testes Integração - Seguidores de Página', () => {
  test('Criar seguidor', async () => {
    const res = await request(app)
      .post('/api/seguidores/criarSeguidor')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador,
        id_pagina
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_seguimento');
  });

  test('Buscar todos os seguidores', async () => {
    const res = await request(app)
      .get('/api/seguidores/verSeguidor')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Buscar páginas seguidas por utilizador', async () => {
    const res = await request(app)
      .get(`/api/seguidores/verPaginasSeguidas/${id_utilizador}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(p => p.id_pagina === id_pagina)).toBe(true);
  });

  test('Verificar presença do seguidor criado na listagem', async () => {
    const res = await request(app)
      .get('/api/seguidores/verSeguidor')
      .set('Authorization', `Bearer ${token}`);
  
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  
    // Verifica se o par (id_utilizador, id_pagina) está entre os resultados
    const existe = res.body.some(s =>
      s.id_utilizador === id_utilizador && s.id_pagina === id_pagina
    );
  
    expect(existe).toBe(true);
  });
  
  test('Remover seguidor existente', async () => {
    const res = await request(app)
      .delete('/api/seguidores/removerSeguidor')
      .set('Authorization', `Bearer ${token}`)
      .send({ id_utilizador, id_pagina });
  
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('mensagem', 'Seguidor removido com sucesso');
  });

  test('Falha ao buscar páginas seguidas com ID inválido', async () => {
    const res = await request(app)
      .get('/api/seguidores/verPaginasSeguidas/abc')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  test('Falha ao aceder rota sem token', async () => {
    const res = await request(app).get('/api/seguidores/verSeguidor');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});