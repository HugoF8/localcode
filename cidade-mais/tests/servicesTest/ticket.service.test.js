const mockCreate = jest.fn();
const mockFind = jest.fn();

const mockestadoticket = {
    aberto: 'aberto',
    fechado: 'fechado',
    pendente: 'pendente',
  };

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        ticket: {
          create: mockCreate,
          findMany: mockFind,
        },
      })),
      estado_ticket: mockestadoticket,
    };
});

//const { estado_ticket, funcao_moderador, tipo_notificacao } = require('@prisma/client');
const { createTicket, getTicketPendente, getTicketFechado, getTicketAberto} = require('../../src/services/ticket.service');

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
        { id_ticket: 1, conteudo_ticket: 'Ticket 1', id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
        { id_ticket: 2, conteudo_ticket: 'Ticket 2', id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
      ];
  
      mockFind.mockResolvedValue(mockReturn);
  
      const result = await getTicketPendente(id_pagina);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_pagina: id_pagina, estado_ticket: mockestadoticket.pendente },
        
      });

      expect(result).toEqual(mockReturn);
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
      expect(result).not.toContain(mockReturn[1])
      expect(result).not.toContain(mockReturn[2])
    });
});

describe('getTicketFechado', () => {
    it('deve chamar prisma.ticket.findMany com o id_pagina correto e o estado_ticket fechado', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_utilizador:42, id_ticket: 1, conteudo_ticket: 'Ticket 1', id_pagina: 12, estado_ticket: mockestadoticket.fechado },
        { id_utilizador:42, id_ticket: 2, conteudo_ticket: 'Ticket 2', id_pagina: 13, estado_ticket: mockestadoticket.fechado },
      ];
  
      mockFind.mockResolvedValue(mockReturn);
  
      const result = await getTicketFechado(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador, estado_ticket: mockestadoticket.fechado },
        
      });

      expect(result).toEqual(mockReturn);
    });
});