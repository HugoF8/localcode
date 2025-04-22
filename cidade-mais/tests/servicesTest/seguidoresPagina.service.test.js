const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        seguidores_pagina: {
          create: mockCreate,
          findMany: mockFind,
        },
      })),
    };
});

const { createUSeguidor, getPaginasSeguidas } = require('../../src/services/seguidoresPagina.service');

describe('createUSeguidor', () => {
    it('deve chamar prisma.seguidores_pagina.create com os dados corretos', async () => {
      const mockData = {
        id_utilizador: 1,
        id_pagina: 2,
      };
      const mockReturn = { id_seguimento: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createUSeguidor(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
});

describe('getPaginasSeguidas', () => {
    it('deve chamar prisma.resposta_ticket.findMany com o id_utilizador correto', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_seguimento: 1, id_utilizador: id_utilizador },
        { id_seguimento: 2, id_utilizador: id_utilizador },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getPaginasSeguidas(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador },
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
  });