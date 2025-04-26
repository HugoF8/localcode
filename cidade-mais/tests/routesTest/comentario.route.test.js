const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let tokenOutros;
let utilizador;
let utilizador2;
let post;

beforeAll(async () => {
  // Limpar tabelas
  await prisma.comentario.deleteMany();
  await prisma.seguidores_pagina.deleteMany();
  await prisma.post.deleteMany();
  await prisma.utilizador2?.deleteMany();
  await prisma.utilizador.deleteMany();

  // Criar utilizador principal
  utilizador = await prisma.utilizador.create({
    data: {
      nome: "Test",
      email: "teste@gmail.com",
      password: "123456",
      data_nascimento: new Date("2000-01-01"),
    },
  });
  token = jwt.sign({
    utilizadorId: utilizador.id_utilizador,
    tipo_utilizador: utilizador.tipo_utilizador,
    email: utilizador.email,
  }, JWT_SECRET, { expiresIn: '1h' });

  // Criar segundo utilizador
  utilizador2 = await prisma.utilizador.create({
    data: {
      nome: "Outro User",
      email: "outro@email.com",
      password: "pass123",
      data_nascimento: new Date("1991-01-01"),
    },
  });
  tokenOutros = jwt.sign({
    utilizadorId: utilizador2.id_utilizador,
    tipo_utilizador: utilizador2.tipo_utilizador,
    email: utilizador2.email,
  }, JWT_SECRET, { expiresIn: '1h' });

  // Criar página e seguir
  const pagina = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: "Página Teste",
      descricao: "Descrição",
      morada: { create: { cidade: "Cidade", codigo_postal: 12345 } },
      utilizador: { connect: { id_utilizador: utilizador.id_utilizador } }
    }
  });

  await prisma.seguidores_pagina.create({
    data: {
      id_utilizador: utilizador.id_utilizador,
      id_pagina: pagina.id_pagina
    }
  });

  // Criar post na página
  post = await prisma.post.create({
    data: {
      id_utilizador: utilizador.id_utilizador,
      id_pagina: pagina.id_pagina,
      descricao_post: "Conteúdo do post"
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Testes Integração – Comentário', () => {
  test('Criar novo comentário', async () => {
    const res = await request(app)
      .post('/api/comentarios/criarComentario')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_post: post.id_post,
        id_utilizador: utilizador.id_utilizador,
        conteudo_comentario: "Olá"
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_comentario');
    expect(res.body.conteudo_comentario).toBe('Olá');
  });

  test('Falhar criar comentário vazio', async () => {
    const res = await request(app)
      .post('/api/comentarios/criarComentario')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_post: post.id_post,
        id_utilizador: utilizador.id_utilizador,
        conteudo_comentario: ""
      });
  
    expect(res.statusCode).toBeGreaterThanOrEqual(400);
  });
  
  
  test('Falhar criar comentário sem token', async () => {
    const res = await request(app)
      .post('/api/comentarios/criarComentario')
      .send({
        id_post: post.id_post,
        id_utilizador: utilizador.id_utilizador,
        conteudo_comentario: "Sem token"
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido');
  });

  test('Falhar criar comentário sem seguir página', async () => {
    const res = await request(app)
      .post('/api/comentarios/criarComentario')
      .set('Authorization', `Bearer ${tokenOutros}`)
      .send({
        id_post: post.id_post,
        id_utilizador: utilizador2.id_utilizador,
        conteudo_comentario: "Não sigo"
      });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Acesso negado. Utilizador não segue esta página.');
  });

  test('Listar todos os comentários', async () => {
    const res = await request(app)
      .get('/api/comentarios/verComentarios')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Buscar comentários de um post', async () => {
    const res = await request(app)
      .get(`/api/comentarios/verComentariosPost/${post.id_post}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(c => c.id_post === post.id_post)).toBe(true);
  });

  test('Falhar buscar comentários de post com id inválido', async () => {
    const res = await request(app)
      .get('/api/comentarios/verComentariosPost/abc')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error', 'id Post deve ser um número válido');
  });
});