const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

describe('Integração – Posts', () => {
  let tokenUser, tokenMod, tokenAdmin;
  let user, modUser, adminUser;
  let page;

  beforeAll(async () => {
    // clean tables in dependency order
    await prisma.notificacao.deleteMany();
    await prisma.post.deleteMany();
    await prisma.seguidores_pagina.deleteMany();
    await prisma.pagina_freguesia.deleteMany();
    await prisma.utilizador.deleteMany();

    // create users
    user = await prisma.utilizador.create({ data: { nome: 'User', email: 'u@x.com', password: '123456', data_nascimento: new Date('2000-01-01') } });
    modUser = await prisma.utilizador.create({ data: { nome: 'Mod', email: 'm@x.com', password: '123456', data_nascimento: new Date('2000-01-01'), tipo_utilizador: 'moderador' } });
    adminUser = await prisma.utilizador.create({ data: { nome: 'Admin', email: 'a@x.com', password: '123456', data_nascimento: new Date('2000-01-01'), tipo_utilizador: 'admin' } });

    [tokenUser, tokenMod, tokenAdmin] = [user, modUser, adminUser].map(u =>
      jwt.sign({ utilizadorId: u.id_utilizador, tipo_utilizador: u.tipo_utilizador, email: u.email }, JWT_SECRET, { expiresIn: '1h' })
    );

    // create a page owned by admin and add modUser as moderator
    page = await prisma.pagina_freguesia.create({
      data: {
        nome_pagina: 'TestPage',
        id_morada: await prisma.morada.create({ data: { cidade: 'C', codigo_postal: 1000 } }).then(m => m.id_morada),
        id_utilizador: adminUser.id_utilizador,
      }
    });
    await prisma.moderador_pagina.create({
      data: { id_pagina: page.id_pagina, id_utilizador: modUser.id_utilizador, funcao: 'moderador' }
    });

    // have user follow the page
    await prisma.seguidores_pagina.create({
      data: { id_pagina: page.id_pagina, id_utilizador: user.id_utilizador }
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test('Criar novo post (seguindo página)', async () => {
    const res = await request(app)
      .post('/api/posts/criarPost')
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({
        id_pagina: page.id_pagina,
        id_utilizador: user.id_utilizador,
        descricao_post: 'Hello world'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_post');
    // notification of type Validacao should be created
    const note = await prisma.notificacao.findFirst({ where: { id_post: res.body.id_post } });
    expect(note.tipo_notificacao).toBe(tipo_notificacao.Validacao);
  });

  test('Falhar criar post sem seguir página', async () => {
    const outsider = await prisma.utilizador.create({ data: { nome: 'Out', email: 'o@x.com', password: '123456', data_nascimento: new Date() } });
    const tokenOut = jwt.sign({ utilizadorId: outsider.id_utilizador, tipo_utilizador: outsider.tipo_utilizador, email: outsider.email }, JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .post('/api/posts/criarPost')
      .set('Authorization', `Bearer ${tokenOut}`)
      .send({ id_pagina: page.id_pagina, id_utilizador: outsider.id_utilizador, descricao_post: 'No follow' });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Acesso negado. Utilizador não segue esta página.');
  });

  test('Listar posts pendentes (moderador)', async () => {
    const res = await request(app)
      .get(`/api/posts/verPostsPendentes/${page.id_pagina}`)
      .set('Authorization', `Bearer ${tokenMod}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].estado_post).toBe('pendente');
  });

  test('Aprovar post (moderador)', async () => {
    // pick the pending post
    const post = await prisma.post.findFirst({ where: { id_pagina: page.id_pagina } });
    const res = await request(app)
      .patch(`/api/posts/atualizarPostsPendentes/${post.id_post}`)
      .set('Authorization', `Bearer ${tokenMod}`)
      .send({ bolean: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.aprovacoes).toBeGreaterThanOrEqual(1);
  });

  test('Recusar post (moderador)', async () => {
    const post = await prisma.post.findFirst({ where: { id_pagina: page.id_pagina } });
    const res = await request(app)
      .patch(`/api/posts/atualizarPostsPendentes/${post.id_post}`)
      .set('Authorization', `Bearer ${tokenMod}`)
      .send({ bolean: false });

    expect(res.statusCode).toBe(200);
    expect(res.body.estado_post).toBe('inativo');
  });

  test('Listar posts de uma página (seguindo ou não)', async () => {
    const res = await request(app)
      .get('/api/posts/verPostsPagina')
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Listar posts aprovados de um utilizador', async () => {
    const res = await request(app)
      .get('/api/posts/verPostsAprovados')
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Alterar informações de post (proprietário)', async () => {
    const post = await prisma.post.findFirst({ where: { id_utilizador: user.id_utilizador } });
    const res = await request(app)
      .patch(`/api/posts/alterarInformacoesPost/${post.id_post}`)
      .set('Authorization', `Bearer ${tokenUser}`)
      .send({ descricao_post: 'Edited', media_post: 'img.png' });

    expect(res.statusCode).toBe(200);
    expect(res.body.descricao_post).toBe('Edited');
  });

  test('Obter feed de páginas seguidas', async () => {
    const res = await request(app)
      .get(`/api/posts/verPostsPaginasSeguidas/${user.id_utilizador}`)
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
