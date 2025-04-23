const request = require('supertest');
const app = require('../../src/app');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';
let token;
let ticketId;
let id_utilizador;
let id_pagina;

beforeAll(async () => {
  await prisma.ticket.deleteMany();
  await prisma.utilizador.deleteMany();
  await prisma.pagina_freguesia.deleteMany();
  await prisma.morada.deleteMany();

  const morada = await prisma.morada.create({
    data: {
      freguesia: 'TestLand',
      cidade: 'TestCity',
      rua: 'Rua Teste',
      codigo_postal: 1234
    }
  });

  const utilizador = await prisma.utilizador.create({
    data: {
      nome: 'Tester',
      email: 'ticket@test.com',
      password: '1234',
      data_nascimento: new Date('2000-01-01'),
      tipo_utilizador: 'moderador',
      id_morada: morada.id_morada
    }
  });

  id_utilizador = utilizador.id_utilizador;
  
  const pagina = await prisma.pagina_freguesia.create({
    data: {
      nome_pagina: 'Página Teste',
      id_morada: morada.id_morada,
      id_utilizador: utilizador.id_utilizador
    }
  });

  id_pagina = pagina.id_pagina;

  token = jwt.sign(
    { utilizadorId: utilizador.id_utilizador, tipo_utilizador: utilizador.tipo_utilizador },
    JWT_SECRET,
    { expiresIn: '1h' }
  );

  await prisma.moderador_pagina.create({
    data: {
      id_utilizador,
      id_pagina,
      funcao: 'moderador'
    }
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Integração - Tickets', () => {
  test('Criar ticket', async () => {
    const res = await request(app)
      .post('/api/tickets/criarTicket')
      .set('Authorization', `Bearer ${token}`)
      .send({
        id_utilizador,
        id_pagina,
        descricao_problema: 'Testando o sistema de tickets.'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id_ticket');
    ticketId = res.body.id_ticket;
  });

  test('Listar todos os tickets', async () => {
    const res = await request(app)
      .get('/api/tickets/verTickets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Listar tickets abertos', async () => {
    const res = await request(app)
      .get('/api/tickets/verTicketAberto')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Atualizar estado do ticket para fechado', async () => {
    const res = await request(app)
      .patch(`/api/tickets/atualizarEstadoTicket/${ticketId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ bol: false });

    expect(res.statusCode).toBe(200);
    expect(res.body.estado_ticket).toBe('fechado');
  });

  test('Atualizar descrição do ticket', async () => {
    const res = await request(app)
      .patch(`/api/tickets/alterarTicket/${ticketId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ descricao_problema: 'Descrição atualizada' });

    expect(res.statusCode).toBe(200);
    expect(res.body.ticket.descricao_problema).toBe('Descrição atualizada');
  });

  test('Listar tickets fechados', async () => {
    const res = await request(app)
      .get('/api/tickets/verTicketFechado')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(t => t.id_ticket === ticketId)).toBe(true);
  });

  test('Listar tickets pendentes (role admin)', async () => {
    const adminToken = jwt.sign(
      { utilizadorId: id_utilizador, tipo_utilizador: 'moderador' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    const res = await request(app)
    .get(`/api/tickets/verTicketsPendentes/${id_pagina}`)
    .set('Authorization', `Bearer ${adminToken}`);
      

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Falhar rota sem token', async () => {
    const res = await request(app).get('/api/tickets/verTickets');
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
  });
});