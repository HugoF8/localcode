const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockUpdate = jest.fn();
const mockFindUnique = jest.fn();
const mockCreateNotificacao = jest.fn();

const mockestadoticket = {
    aberto: 'aberto',
    fechado: 'fechado',
    pendente: 'pendente',
  };

  const mockTipoNotificacao = {
    Aprovado: 'Aprovado',
    Recusado: 'Recusado',
    Validacao: 'Validacao', 
    Verificacao: 'Verificacao',
    Sucesso: 'Sucesso',
    Insucesso: 'Insucesso'
};

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        ticket: {
          create: mockCreate,
          findMany: mockFind,
          update: mockUpdate,
          findUnique: mockFindUnique,
        },
        notificacao: {
          create: mockCreateNotificacao,
        }
      })),
      estado_ticket: mockestadoticket,
      tipo_notificacao: mockTipoNotificacao
    };
});

const { tipo_notificacao } = require('@prisma/client');
//const { estado_ticket, funcao_moderador, tipo_notificacao } = require('@prisma/client');
const { createTicket, getTicketPendente, getTicketFechado, getTicketAberto, atualizarEstadoTicket, alterarTicket} = require('../../src/services/ticket.service');

describe('createTicket', () => {
    it('deve chamar prisma.ticket.create com os dados corretos', async () => {
      const mockData = {
        id_utilizador: 1,
        id_pagina: 2,
        descricao_problema: "Teste"
      };
      const mockReturn = { id_ticket: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createTicket(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
});

describe('getTicketPendente', () => {
    it('deve chamar prisma.ticket.findMany com o id_pagina correto e o estado_ticket pendente', async () => {
      const id_pagina = 42;
      const mockReturn = [
        { id_ticket: 1, descricao_problema: 'Ticket 1', id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
        { id_ticket: 2, descricao_problema: 'Ticket 2', id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getTicketPendente(id_pagina);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
        
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
});

describe('getTicketAberto', () => {
    it('deve chamar prisma.ticket.findMany com o id_pagina correto e o estado_ticket aberto', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_utilizador:42, id_ticket: 1, conteudo_ticket: 'Ticket 1', id_pagina: 11, estado_ticket: mockestadoticket.aberto },
        { id_utilizador:43, id_ticket: 3, conteudo_ticket: 'Ticket 2', id_pagina: 12, estado_ticket: mockestadoticket.aberto },
        { id_utilizador:42, id_ticket: 4, conteudo_ticket: 'Ticket 2', id_pagina: 12, estado_ticket: mockestadoticket.fechado },
      ];
  
      mockFind.mockResolvedValue(mockReturn[0]);
  
      const result = await getTicketAberto(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador:id_utilizador , estado_ticket: mockestadoticket.aberto },
        
      });
      expect(result).toEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1])
      expect(result).not.toContainEqual(mockReturn[2])
    });
});

describe('getTicketFechado', () => {
    it('deve chamar prisma.ticket.findMany com o id_pagina correto e o estado_ticket fechado', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_utilizador:42, id_ticket: 1, conteudo_ticket: 'Ticket 1', id_pagina: 12, estado_ticket: mockestadoticket.fechado },
        { id_utilizador:42, id_ticket: 2, conteudo_ticket: 'Ticket 2', id_pagina: 13, estado_ticket: mockestadoticket.fechado },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getTicketFechado(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador, estado_ticket: mockestadoticket.fechado },
        
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
});

describe('atualizarEstadoTicket', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('atualiza o estado para "aberto" e envia notificação "Aprovado"', async () => {
    const idTicket = 5;
    const mockTicket = { id_ticket: idTicket, id_utilizador: 10 };
    const mockUpdatedTicket = { id_ticket: idTicket, estado_ticket: 'aberto' };

    mockUpdate.mockResolvedValue(mockUpdatedTicket);
    mockFindUnique.mockResolvedValue(mockTicket);

    const result = await atualizarEstadoTicket(idTicket, true);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_ticket: idTicket },
      data: { estado_ticket: 'aberto' },
    });

    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_ticket: idTicket } });

    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data:{
      id_utilizador: mockTicket.id_utilizador,
      id_ticket: idTicket,
      tipo_notificacao: mockTipoNotificacao.Aprovado,
      }
    });

    expect(result).toEqual(mockUpdatedTicket);
  });

  it('atualiza o estado para "fechado" e envia notificação "Recusado"', async () => {
    const idTicket = 5;
    const mockTicket = { id_ticket: idTicket, id_utilizador: 20 };
    const mockUpdatedTicket = { id_ticket: idTicket, estado_ticket: 'fechado' };

    mockUpdate.mockResolvedValue(mockUpdatedTicket);
    mockFindUnique.mockResolvedValue(mockTicket);

    const result = await atualizarEstadoTicket(idTicket, false);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_ticket: idTicket },
      data: { estado_ticket: 'fechado' },
    });

    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data:{
      id_utilizador: mockTicket.id_utilizador,
      id_ticket: idTicket,
      tipo_notificacao: mockTipoNotificacao.Recusado,
      }
    });

    expect(result).toEqual(mockUpdatedTicket);
  });
});

describe('alterarTicket', () => {
  it('altera a descrição do problema de um ticket', async () => {
    const idTicket = 3;
    const novaDescricao = "Novo problema aqui";
    const mockTicket = {
      id_ticket: idTicket,
      descricao_problema: novaDescricao,
    };

    mockUpdate.mockResolvedValue(mockTicket);

    const result = await alterarTicket(idTicket, novaDescricao);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_ticket: idTicket },
      data: { descricao_problema: novaDescricao },
    });

    expect(result).toEqual(mockTicket);
  });
});
