// tests/servicesTest/ticket.service.test.js
const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => ({
  // enum export
  tipo_notificacao: {
    Aprovado: 'Aprovado',
    Recusado: 'Recusado'
  },
  PrismaClient: jest.fn().mockImplementation(() => ({
    ticket: {
      create: mockCreate,
      findMany: mockFind,
      findUnique: mockFindUnique,
      update: mockUpdate
    }
  }))
}));

jest.mock('../../src/services/notificacao.service', () => ({
  createNotificacao: mockCreateNotificacao
}));

// Re-require agora que PrismaClient está mockado
const {
  createTicket,
  getTicketPendente,
  getTicketAberto,
  getTicketFechado,
  atualizarEstadoTicket,
  alterarTicket
} = require('../../src/services/ticket.service');

// instância mockada
const prisma = new (require('@prisma/client').PrismaClient)();

describe('createTicket', () => {
  it('deve chamar prisma.ticket.create com os dados corretos', async () => {
    const data = { id_pagina: 1, id_utilizador: 2, problema: 'X' };
    mockCreate.mockResolvedValue({ id_ticket: 10, ...data });

    const result = await createTicket(data);
    expect(mockCreate).toHaveBeenCalledWith({ data });
    expect(result.id_ticket).toBe(10);
  });
});

describe('getTicketPendente', () => {
  it('deve chamar prisma.ticket.findMany com include correto', async () => {
    mockFind.mockResolvedValue([{ id_ticket: 1 }]);
    await getTicketPendente(5);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_pagina: 5, estado_ticket: 'pendente' },
      include: {
        utilizador: {
          select: {
            nome: true,
            perfil: { select: { foto_perfil: true } }
          }
        }
      }
    });
  });
});

describe('getTicketAberto', () => {
  it('deve chamar prisma.ticket.findMany com id_utilizador e estado aberto', async () => {
    mockFind.mockResolvedValue([{ id_ticket: 2 }]);
    await getTicketAberto(3);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador: 3, estado_ticket: 'aberto' }
    });
  });
});

describe('getTicketFechado', () => {
  it('deve chamar prisma.ticket.findMany com id_utilizador e estado fechado', async () => {
    mockFind.mockResolvedValue([{ id_ticket: 4 }]);
    await getTicketFechado(3);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador: 3, estado_ticket: 'fechado' }
    });
  });
});

describe('atualizarEstadoTicket', () => {
  it('deve atualizar para aberto e enviar notificação', async () => {
    const id_ticket = 7;
    mockUpdate.mockResolvedValue({ id_ticket, estado_ticket: 'aberto' });
    mockFindUnique.mockResolvedValue({ id_ticket, id_utilizador: 9 });

    const res = await atualizarEstadoTicket(id_ticket, true);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_ticket },
      data: { estado_ticket: 'aberto' }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: 9,
      id_ticket,
      tipo_notificacao: 'Aprovado'
    });
    expect(res).toEqual({ id_ticket, estado_ticket: 'aberto' });
  });
});

describe('alterarTicket', () => {
  it('deve atualizar descrição do problema e estado para pendente', async () => {
    const id_ticket = 8;
    const desc = 'Nova descrição';
    mockUpdate.mockResolvedValue({ id_ticket, descricao_problema: desc, estado_ticket: 'pendente' });

    const res = await alterarTicket(id_ticket, desc);
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_ticket },
      data: { descricao_problema: desc, estado_ticket: 'pendente' }
    });
    expect(res.descricao_problema).toBe(desc);
  });
});