const request = require('supertest');
const app = require('../../src/app');
const path = require('path');
const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

describe('Testes Integração – Posts', () => {
  let tokenUser, tokenMod, tokenAdmin;
  let user, modUser, adminUser;
  let pagina;

  beforeAll(async () => {
    
    await prisma.notificacao.deleteMany();
    await prisma.post.deleteMany();
    await prisma.seguidores_pagina.deleteMany();
    await prisma.pagina_freguesia.deleteMany();
    await prisma.utilizador.deleteMany();

   
    user = await prisma.utilizador.create({ 
      data: { 
        nome: 'Teste',
         email: 'teste@gmail.com', 
         password: '123456', 
         data_nascimento: new Date('2000-01-01') 
        } 
      });
    
        modUser = await prisma.utilizador.create({ 
      data: { 
        nome: 'Mod', 
        email: 'mod@gmail.com', 
        password: '123456', 
        data_nascimento: new Date('2000-01-01'), 
        tipo_utilizador: 'moderador' 
      } 
    });
    
      adminUser = await prisma.utilizador.create({ 
        data: { 
          nome: 'Admin', 
          email: 'admin@gmail.com', 
          password: '123456', 
          data_nascimento: new Date('2000-01-01'), 
          tipo_utilizador: 'admin' 
        } 
      });

    [tokenUser, tokenMod, tokenAdmin] = [user, modUser, adminUser].map(u =>
      jwt.sign({ utilizadorId: u.id_utilizador, tipo_utilizador: u.tipo_utilizador, email: u.email }, JWT_SECRET, { expiresIn: '1h' })
    );

    
    pagina = await prisma.pagina_freguesia.create({
      data: {
        nome_pagina: 'Pagina Teste',
        id_morada: await prisma.morada.create({ data: { cidade: 'C', codigo_postal: 1000 } }).then(m => m.id_morada),
        id_utilizador: adminUser.id_utilizador,
      }
    });
    await prisma.moderador_pagina.create({
      data: { id_pagina: pagina.id_pagina, id_utilizador: modUser.id_utilizador, funcao: 'moderador' }
    });

    
    await prisma.seguidores_pagina.create({
      data: { id_pagina: pagina.id_pagina, id_utilizador: user.id_utilizador }
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
        id_pagina: pagina.id_pagina,
        id_utilizador: user.id_utilizador,
        descricao_post: 'ola'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_post');
    
    const note = await prisma.notificacao.findFirst({ where: { id_post: res.body.id_post } });
    expect(note.tipo_notificacao).toBe(tipo_notificacao.Validacao);
  });

  test('Criar post com upload de imagem', async () => {
    const res = await request(app)
      .post('/api/posts/criarPost')
      .set('Authorization', `Bearer ${tokenUser}`)
      .field('id_pagina', pagina.id_pagina)
      .field('id_utilizador', user.id_utilizador)
      .field('descricao_post', 'Post com imagem')
      .attach('media_post', path.resolve(__dirname, '../imagens/imagemteste.jpg'));
  
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('media_post');
    expect(res.body.media_post).toMatch(/uploads/);
  });

  test('Falhar criar post sem seguir página', async () => {
    const outsider = await prisma.utilizador.create({ data: { nome: 'Teste2', email: 'teste2@gmail.com', password: '123456', data_nascimento: new Date() } });
    const tokenOut = jwt.sign({ utilizadorId: outsider.id_utilizador, tipo_utilizador: outsider.tipo_utilizador, email: outsider.email }, JWT_SECRET, { expiresIn: '1h' });

    const res = await request(app)
      .post('/api/posts/criarPost')
      .set('Authorization', `Bearer ${tokenOut}`)
      .send({ id_pagina: pagina.id_pagina, id_utilizador: outsider.id_utilizador, descricao_post: 'No follow' });

    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error', 'Acesso negado. Utilizador não segue esta página.');
  });

  test('Listar posts pendentes (moderador)', async () => {
    const res = await request(app)
      .get(`/api/posts/verPostsPendentes/${pagina.id_pagina}`)
      .set('Authorization', `Bearer ${tokenMod}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].estado_post).toBe('pendente');
  });

  test('Aprovar post (moderador)', async () => {
    // pick the pending post
    const post = await prisma.post.findFirst({ where: { id_pagina: pagina.id_pagina } });
    const res = await request(app)
      .patch(`/api/posts/atualizarPostsPendentes/${post.id_post}`)
      .set('Authorization', `Bearer ${tokenMod}`)
      .send({ bolean: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.aprovacoes).toBeGreaterThanOrEqual(1);
  });

  test('Recusar post (moderador)', async () => {
    const post = await prisma.post.findFirst({ where: { id_pagina: pagina.id_pagina } });
    const res = await request(app)
      .patch(`/api/posts/atualizarPostsPendentes/${post.id_post}`)
      .set('Authorization', `Bearer ${tokenMod}`)
      .send({ bolean: false });

    expect(res.statusCode).toBe(200);
    expect(res.body.estado_post).toBe('inativo');
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
      .field('descricao_post', 'Edited') 
      .attach('media_post', path.resolve(__dirname, '../imagens/imagemteste.jpg')); 
  
    expect(res.statusCode).toBe(200);
    expect(res.body.descricao_post).toBe('Edited');
    expect(res.body.media_post).toMatch(/uploads/); 
  });

  test('Obter feed de páginas seguidas', async () => {
    const res = await request(app)
      .get(`/api/posts/verPostsPaginasSeguidas`)
      .set('Authorization', `Bearer ${tokenUser}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
