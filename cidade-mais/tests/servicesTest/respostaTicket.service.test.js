const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        respostaTicket: {
          create: mockCreate,
          findMany: mockFind,
        },
      })),
    };
  });

  const { createResposta, getRespostasPorUtilizador} = require('../../src/services/respostaTicket.service');



  describe('getRespostasPorUtilizador', () => {
    it('deve chamar prisma.resposta_ticket.findMany com o id_utilizador correto', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_resposta: 1, conteudo_resposta: 'Resposta 1', id_utilizador: id_utilizador },
        { id_resposta: 2, conteudo_resposta: 'Resposta 2', id_utilizador: id_utilizador },
      ];
  
      mockFind.mockResolvedValue(mockReturn);
  
      const result = await getRespostasPorUtilizador(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador },
      });

      expect(result).toEqual(mockReturn);
    });
  });