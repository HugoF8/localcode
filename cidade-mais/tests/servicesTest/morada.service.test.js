const mockCreate = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        morada: {
          create: mockCreate,
        },
      })),
    };
  });

const { createMorada } = require('../../src/services/morada.service');

describe('createMorada', () => {
    it('deve chamar prisma.morada.create com os dados corretos', async () => {
      const mockData = {
        freguesia: "Teste",
        cidade: "Teste",
        rua: "Teste",
        codigo_postal: 1,
      };
      const mockReturn = { id_morada: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createMorada(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
  });