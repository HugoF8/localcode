const mockCreate = jest.fn();

const mockfuncao_moderador = {
    dono: 'dono',
    moderador: 'moderador',
  };

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        moderador_pagina: {
          create: mockCreate,
        },
      })),
      funcao_moderador: mockfuncao_moderador,
    };
  });

const { createModeradorPagina } = require('../../src/services/moderadorPagina.service');

  describe('createModeradorPagina', () => {
    it('deve chamar prisma.ModeradorPagina.create com os dados corretos', async () => {
      const mockData = {
        id_pagina: 1,
        id_utilizador: 2,
        funcao_moderador: mockfuncao_moderador.moderador,
      };
      const mockReturn = { id_moderador: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createModeradorPagina(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
  });