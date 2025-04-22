process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../../src/app");
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

describe('POST /tickets', () => {
  let token;
  let utilizadorId;
  let categoriaId;
  let paginaId;

  beforeAll(async () => {
    // Criar utilizador com todos os campos obrigatórios
    const utilizador = await prisma.utilizador.create({
      data: {
        nome: 'Test User',
        email: 'test@example.com',
        password: 'hashedpassword',
        tipo: 'utilizador',
        data_nascimento: new Date('1990-01-01'),
      },
    });

    utilizadorId = utilizador.id;

    // Criar categoria
    const categoria = await prisma.categoria_ticket.create({
      data: {
        nome: 'Categoria Teste',
      },
    });

    categoriaId = categoria.id;

    // Criar página
    const pagina = await prisma.pagina_freguesia.create({
      data: {
        nome: 'Página Teste',
        freguesia: 'Freguesia Teste',
      },
    });

    paginaId = pagina.id;

    // Criar token JWT
    token = jwt.sign(
      { id: utilizador.id, tipo: utilizador.tipo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  });

  afterAll(async () => {
    await prisma.ticket.deleteMany();
    await prisma.pagina_freguesia.deleteMany();
    await prisma.categoria_ticket.deleteMany();
    await prisma.utilizador.deleteMany();
    await prisma.$disconnect();
  });

  it('cria um ticket com sucesso', async () => {
    const response = await request(app)
      .post('/tickets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        titulo: 'Teste de Ticket',
        descricao: 'Descrição teste',
        categoriaId,
        paginaId,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.titulo).toBe('Teste de Ticket');
  });

  it('retorna 401 se não houver token', async () => {
    const response = await request(app)
      .post('/tickets')
      .send({
        titulo: 'Sem Token',
        descricao: 'Falha esperada',
        categoriaId,
        paginaId,
      });

    expect(response.status).toBe(401);
  });

  it('retorna 400 se faltar campo obrigatório', async () => {
    const response = await request(app)
      .post('/tickets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        descricao: 'Falta o título',
        categoriaId,
        paginaId,
      });

    expect(response.status).toBe(400);
  });
});