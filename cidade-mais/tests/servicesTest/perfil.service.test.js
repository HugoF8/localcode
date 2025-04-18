const mockCreate = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        perfil: {
          create: mockCreate,
        },
      })),
    };
  });

const { createPerfil } = require('../../src/services/perfil.service');

describe('createPerfil', () => {
    it('deve chamar prisma.Perfil.create com os dados corretos', async () => {
      const mockData = {
        id_utilizador: 1,
        foto_perfil: "Caminho",
        foto_capa: "Caminho",
        biografia: "Teste",
      };
      const mockReturn = { id_perfil: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createPerfil(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
  });