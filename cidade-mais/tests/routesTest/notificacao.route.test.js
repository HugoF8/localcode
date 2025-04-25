const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

let token;
let utilizador;
let morada;
let pagina;
let post;
let ticket;

describe('Integração – Notificação', () => {
  beforeAll(async () => {
    // Limpeza de todos os dados
    await prisma.notificacao.deleteMany();
    await prisma.ticket.deleteMany();
    await prisma.post.deleteMany();
    await prisma.pagina_freguesia.deleteMany();
    await prisma.morada.deleteMany();
    await prisma.utilizador.deleteMany();

    // Criar utilizador
    utilizador = await prisma.utilizador.create({
      data: {
        nome: 'Notif Tester',
        email: 'notif@exemplo.com',
        password: '123456',
        data_nascimento: new Date('1990-01-01')
      }
    });

    // Gerar token
    token = jwt.sign(
      {
        utilizadorId: utilizador.id_utilizador,
        tipo_utilizador: utilizador.tipo_utilizador,
        email: utilizador.email
      },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Criar morada
    morada = await prisma.morada.create({
      data: {
        cidade: 'Lisboa',
        codigo_postal: 1000
      }
    });

    // Criar página de freguesia
    pagina = await prisma.pagina_freguesia.create({
      data: {
        nome_pagina: 'Freguesia Teste',
        id_morada: morada.id_morada,
        id_utilizador: utilizador.id_utilizador
      }
    });

    // Criar post
    post = await prisma.post.create({
      data: {
        descricao_post: 'Conteúdo do post',
        id_utilizador: utilizador.id_utilizador,
        id_pagina: pagina.id_pagina
      }
    });

    // Criar ticket
    ticket = await prisma.ticket.create({
      data: {
        descricao_problema: 'Problema de teste',
        id_utilizador: utilizador.id_utilizador,
        id_pagina: pagina.id_pagina
      }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Criar nova notificação', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador: utilizador.id_utilizador,
        tipo_notificacao: 'Sucesso',
        conteudo_notificacao: 'Teste de notificação'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_notificacao');
    expect(res.body.tipo_notificacao).toBe('Sucesso');
  });

  test('Listar todas as notificações', async () => {
    const res = await request(app)
      .get('/api/notificacao/verNotificacao')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('Buscar notificações por utilizador', async () => {
    const res = await request(app)
      .get(`/api/notificacao/verNotificacaoPorUtilizador/${utilizador.id_utilizador}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.every(n => n.id_utilizador === utilizador.id_utilizador)).toBe(true);
  });

  test('Falhar criar sem token', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .send({
        id_utilizador: utilizador.id_utilizador,
        tipo_notificacao: 'Insucesso'
      });

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error', 'Token não fornecido');
  });

  test('Falhar rota com token inválido', async () => {
    const res = await request(app)
      .get('/api/notificacao/verNotificacao')
      .set('Authorization', 'Bearer token-invalido');

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Token inválido');
  });

  test('Falhar buscar por utilizador sem param', async () => {
    const res = await request(app)
      .get('/api/notificacao/verNotificacaoPorUtilizador/')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(404);
  });

  test('Criar notificação para página ', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador: utilizador.id_utilizador,
        id_pagina: pagina.id_pagina,
        tipo_notificacao: 'Aprovado',
        conteudo_notificacao: 'Teste para página'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('pagina_freguesia');
    expect(res.body.pagina_freguesia.id_pagina).toBe(pagina.id_pagina);
  });

  test('Criar notificação para post ', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador: utilizador.id_utilizador,
        id_post: post.id_post,
        tipo_notificacao: 'Aprovado',
        conteudo_notificacao: 'Teste para post'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('post');
    expect(res.body.post.id_post).toBe(post.id_post);
  });

  test('Criar notificação para ticket ', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador: utilizador.id_utilizador,
        id_ticket: ticket.id_ticket,
        tipo_notificacao: 'Verificacao',
        conteudo_notificacao: 'Teste para ticket'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('ticket');
    expect(res.body.ticket.id_ticket).toBe(ticket.id_ticket);
  });

  test('Falha ao criar notificação com múltiplas relações', async () => {
    const res = await request(app)
      .post('/api/notificacao/criarNotificacao')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador: utilizador.id_utilizador,
        id_post: post.id_post,
        id_ticket: ticket.id_ticket,
        tipo_notificacao: 'Erro',
        conteudo_notificacao: 'Tentativa inválida'
      });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty(
      'error',
      'Só podes associar a notificação a UM destes: post, ticket ou página.'
    );
  });

});
