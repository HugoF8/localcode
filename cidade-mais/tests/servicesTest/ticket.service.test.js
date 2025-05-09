const mockCreate = jest.fn();
const mockFind = jest.fn();const mockUpdate = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    ticket: { create: mockCreate, findMany: mockFind, update: mockUpdate }
  }))
}));

jest.mock('../../src/services/notificacao.service', () => ({ createNotificacao: mockCreateNotificacao }));

const {
  createTicket,
  getTicketPendente,
  getTicketAberto,
  getTicketFechado,
  atualizarEstadoTicket,
  alterarTicket
} = require('../../src/services/ticket.service');

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
    const res = await getTicketPendente(5);
    expect(mockFind).toHaveBeenCalledWith({ where: { estado_ticket: 'pendente' }, include: { pagina_freguesia: true, utilizador: true } });
  });
});

describe('getTicketAberto', () => {
  it('deve chamar prisma.ticket.findMany com id_pagina e estado_ticket aberto', async () => {
    mockFind.mockResolvedValue([{ id_ticket: 2 }]);
    const res = await getTicketAberto(3);
    expect(mockFind).toHaveBeenCalledWith({ where: { id_pagina: 3, estado_ticket: 'aberto' } });
  });
});

describe('getTicketFechado', () => {
  it('deve chamar prisma.ticket.findMany com id_pagina e estado_ticket fechado', async () => {
    mockFind.mockResolvedValue([{ id_ticket: 4 }]);
    const res = await getTicketFechado(3);
    expect(mockFind).toHaveBeenCalledWith({ where: { id_pagina: 3, estado_ticket: 'fechado' } });
  });
});

describe('atualizarEstadoTicket', () => {
  it('deve atualizar e enviar notificação correta', async () => {
    const id_ticket = 7;
    const tipo = 'Aprovado';
    const updated = { id_ticket, id_utilizador: 9 };
    mockUpdate.mockResolvedValue(updated);

    const res = await atualizarEstadoTicket(id_ticket, tipo);

    expect(mockUpdate).toHaveBeenCalledWith({ where: { id_ticket }, data: { estado_ticket: tipo } });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({ id_utilizador: updated.id_utilizador, id_ticket, tipo_notificacao: tipo });
    expect(res).toEqual(updated);
  });
});

describe('alterarTicket', () => {
  it('deve atualizar descrição do problema', async () => {
    const id_ticket = 8;
    const desc = 'Nova descrição';
    mockUpdate.mockResolvedValue({ id_ticket, problema: desc });

    const res = await alterarTicket(id_ticket, desc);
    expect(mockUpdate).toHaveBeenCalledWith({ where: { id_ticket }, data: { problema: desc } });
    expect(res.problema).toBe(desc);
  });
});