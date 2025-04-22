const mockFindUnique = jest.fn();
const mockFindFirst = jest.fn();
const mockFindPedido = jest.fn();
const mockFindTicket = jest.fn();
const mockFindFirstModerador = jest.fn();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { authSeguir, authProprietario, authModerador } = require('../../src/middlewares/verificacoes.middleware'); // ou ajusta o path


jest.mock('@prisma/client', () =>{
    return {
        PrismaClient: jest.fn().mockImplementation(()=> ({
            post: { findUnique: mockFindUnique },
            seguidores_pagina: { findFirst: mockFindFirst },
            pedido_pagina: { findUnique: mockFindPedido },
            ticket: { findUnique: mockFindTicket },
            moderador_pagina: { findFirst: mockFindFirstModerador}
        }))
    }
})

describe('authSeguir middleware', () => {
    const mockNext = jest.fn();
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('deve permitir se o utilizador segue a página (com id_pagina)', async () => {

      const req = { 
        body: { id_pagina: 1 },
        utilizador: { utilizadorId: 123 }
        };
  
      mockFindFirst.mockResolvedValue({ id_utilizador: 123, id_pagina: 1 });
  
      await authSeguir(req, mockRes, mockNext);
  
      expect(mockFindFirst).toHaveBeenCalledWith({
        where: {id_utilizador: 123, id_pagina: 1 }
      });

      expect(mockNext).toHaveBeenCalled();

    });
    it('deve buscar id_pagina a partir do id_post e permitir se o utilizador segue', async () => {
        const req = {
          body: { id_post: 10 },
          utilizador: { utilizadorId: 123 }
        };
    
        mockFindUnique.mockResolvedValue({ id_pagina: 5 });
        mockFindFirst.mockResolvedValue({ id_utilizador: 123, id_pagina: 5 });
    
        await authSeguir(req, mockRes, mockNext);
    
        expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_post: 10 } });
        expect(mockFindFirst).toHaveBeenCalledWith({
          where: { id_utilizador: 123, id_pagina: 5 }
        });
        expect(mockNext).toHaveBeenCalled();
      });
    
      it('deve retornar 404 se o post não existir', async () => {

        const req = {
          body: { id_post: 999 },
          utilizador: { utilizadorId: 123 }
        };
    
        mockFindUnique.mockResolvedValue(null); // post não encontrado
    
        await authSeguir(req, mockRes, mockNext);
    
        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Post não encontrado.' });
      });
    
      it('deve retornar 403 se o utilizador não seguir a página', async () => {
        const req = {
          body: { id_pagina: 1 },
          utilizador: { utilizadorId: 123 }
        };
    
        mockFindFirst.mockResolvedValue(null); // Não segue a página
    
        await authSeguir(req, mockRes, mockNext);
    
        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Acesso negado. Utilizador não segue esta página.' });
      });
    
      it('deve retornar 500 em caso de erro inesperado', async () => {
        const req = {
          body: { id_pagina: 1 },
          utilizador: { utilizadorId: 123 }
        };
    
        mockFindFirst.mockRejectedValue(new Error('DB error'));
    
        await authSeguir(req, mockRes, mockNext);
    
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro interno ao verificar permissão.' });
      });










      describe('authProprietario middleware', () => {
        const mockNext = jest.fn();
        const mockRes = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        };
      
        beforeEach(() => {
          jest.clearAllMocks();
        });
      
        // Teste para "Post" - já feito anteriormente
        it('deve retornar 404 se o post não for encontrado', async () => {
          const req = {
            body: { id_post: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindUnique.mockResolvedValue(null); // Simula o caso em que o post não é encontrado
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(404);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Post não encontrado' });
        });
      
        // Teste para "Pedido"
        it('deve retornar 404 se o pedido não for encontrado', async () => {
          const req = {
            body: { id_pedido: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindPedido.mockResolvedValue(null); // Simula o caso em que o pedido não é encontrado
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(404);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Pedido não encontrado' });
        });
      
        // Teste para "Ticket"
        it('deve retornar 404 se o ticket não for encontrado', async () => {
          const req = {
            body: { id_ticket: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindTicket.mockResolvedValue(null); // Simula o caso em que o ticket não é encontrado
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(404);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Ticket não encontrado' });
        });





      
        // Teste para "Post" - caso o utilizador atual não seja o proprietário
        it('deve retornar 403 se o utilizador atual não for o proprietário de um post', async () => {
          const req = {
            body: { id_post: 1 },
            utilizador: { utilizadorId: 124 }, // O utilizador atual não é o proprietário
          };
      
          mockFindUnique.mockResolvedValue({ id_utilizador: 123 }); // O post é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(403);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Não autorizado a aceder a este recurso' });
        });
      
        // Teste para "Pedido" - caso o utilizador atual não seja o proprietário
        it('deve retornar 403 se o utilizador atual não for o proprietário de um pedido', async () => {
          const req = {
            body: { id_pedido: 1 },
            utilizador: { utilizadorId: 124 }, // O utilizador atual não é o proprietário
          };
      
          mockFindPedido.mockResolvedValue({ id_utilizador: 123 }); // O pedido é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(403);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Não autorizado a aceder a este recurso' });
        });
      
        // Teste para "Ticket" - caso o utilizador atual não seja o proprietário
        it('deve retornar 403 se o utilizador atual não for o proprietário de um ticket', async () => {
          const req = {
            body: { id_ticket: 1 },
            utilizador: { utilizadorId: 124 }, // O utilizador atual não é o proprietário
          };
      
          mockFindTicket.mockResolvedValue({ id_utilizador: 123 }); // O ticket é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(403);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Não autorizado a aceder a este recurso' });
        });




      
        // Teste para "Post", "Pedido", e "Ticket" - caso o utilizador atual seja o proprietário
        it('deve permitir o acesso se o utilizador atual for o proprietário de um post', async () => {
          const req = {
            body: { id_post: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindUnique.mockResolvedValue({ id_utilizador: 123 }); // O post é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockNext).toHaveBeenCalled(); // O next() deve ser chamado
        });
      
        it('deve permitir o acesso se o utilizador atual for o proprietário de um pedido', async () => {
          const req = {
            body: { id_pedido: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindPedido.mockResolvedValue({ id_utilizador: 123 }); // O pedido é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockNext).toHaveBeenCalled(); // O next() deve ser chamado
        });
      
        it('deve permitir o acesso se o utilizador atual for o proprietário de um ticket', async () => {
          const req = {
            body: { id_ticket: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindTicket.mockResolvedValue({ id_utilizador: 123 }); // O ticket é do utilizador 123
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockNext).toHaveBeenCalled(); // O next() deve ser chamado
        });


        
      
        // Teste para erro inesperado no banco de dados (qualquer tipo de recurso)
        it('deve retornar 500 se ocorrer um erro no banco de dados', async () => {
          const req = {
            body: { id_post: 1 },
            utilizador: { utilizadorId: 123 },
          };
      
          mockFindUnique.mockRejectedValue(new Error('DB error')); // Simula erro do banco de dados
      
          await authProprietario(req, mockRes, mockNext);
      
          expect(mockRes.status).toHaveBeenCalledWith(500);
          expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erro interno ao verificar proprietário' });
        });
      });









      describe('authModerador', () => {
        let req, res, next;
      
        beforeEach(() => {
          req = {
            params: {},
            body: {},
            utilizador: { utilizadorId: 1 },
          };
          res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };
          next = jest.fn();
      
          jest.clearAllMocks();
        });
      
        it('deve permitir acesso se for moderador de um post', async () => {
          req.params.id_post = '10';
      
          prisma.post.findUnique.mockResolvedValue({ id_pagina: 5 });
          prisma.moderador_pagina.findFirst.mockResolvedValue({ id_utilizador: 1 });
      
          await authModerador(req, res, next);
      
          expect(prisma.post.findUnique).toHaveBeenCalledWith({ where: { id_post: 10 } });
          expect(prisma.moderador_pagina.findFirst).toHaveBeenCalledWith({
            where: { id_utilizador: 1, id_pagina: 5 },
          });
          expect(next).toHaveBeenCalled();
        });
      
        it('deve permitir acesso se for moderador de um ticket', async () => {
          req.body.id_ticket = '15';
      
          prisma.ticket.findUnique.mockResolvedValue({ id_pagina: 8 });
          prisma.moderador_pagina.findFirst.mockResolvedValue({ id_utilizador: 1 });
      
          await authModerador(req, res, next);
      
          expect(prisma.ticket.findUnique).toHaveBeenCalledWith({ where: { id_ticket: 15 } });
          expect(prisma.moderador_pagina.findFirst).toHaveBeenCalledWith({
            where: { id_utilizador: 1, id_pagina: 8 },
          });
          expect(next).toHaveBeenCalled();
        });
      
        it('deve retornar 404 se o post não existir', async () => {
          req.params.id_post = '10';
          prisma.post.findUnique.mockResolvedValue(null);
      
          await authModerador(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Post não encontrado' });
          expect(next).not.toHaveBeenCalled();
        });
      
        it('deve retornar 404 se o ticket não existir', async () => {
          req.body.id_ticket = '15';
          prisma.ticket.findUnique.mockResolvedValue(null);
      
          await authModerador(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(404);
          expect(res.json).toHaveBeenCalledWith({ error: 'Ticket não encontrado' });
          expect(next).not.toHaveBeenCalled();
        });
      
        it('deve retornar 403 se não for moderador da página', async () => {
          req.params.id_post = '10';
          prisma.post.findUnique.mockResolvedValue({ id_pagina: 5 });
          prisma.moderador_pagina.findFirst.mockResolvedValue(null);
      
          await authModerador(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(403);
          expect(res.json).toHaveBeenCalledWith({
            error: "Não autorizado a aceder a este recurso",
            id_utilizador: 1,
            id_pagina: 5,
          });
          expect(next).not.toHaveBeenCalled();
        });
      
        it('deve retornar 400 se nenhum identificador for fornecido', async () => {
          await authModerador(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(400);
          expect(res.json).toHaveBeenCalledWith({ error: 'Nenhum identificador fornecido' });
          expect(next).not.toHaveBeenCalled();
        });
      
        it('deve retornar 500 se ocorrer erro inesperado', async () => {
          req.params.id_post = '10';
          prisma.post.findUnique.mockRejectedValue(new Error('DB error'));
      
          await authModerador(req, res, next);
      
          expect(res.status).toHaveBeenCalledWith(500);
          expect(res.json).toHaveBeenCalledWith({
            error: 'Erro interno ao verificar permissões de moderação',
          });
          expect(next).not.toHaveBeenCalled();
        });
      });

      
})