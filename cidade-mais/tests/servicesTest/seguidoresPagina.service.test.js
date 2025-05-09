const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    seguidores_pagina: {
      create: mockCreate,
      findMany: mockFind
    }
  }))
}));

const { createUSeguidor, getPaginasSeguidas } = require('../../src/services/seguidoresPagina.service');

describe('createUSeguidor', () => {
  it('deve chamar prisma.seguidores_pagina.create com os dados corretos', async () => {
    const mockData = { id_utilizador: 1, id_pagina: 2 };
    const mockReturn = { id_seguidor: 5, ...mockData };
    mockCreate.mockResolvedValue(mockReturn);

    const result = await createUSeguidor(mockData);

    expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockReturn);
  });
});

describe('getPaginasSeguidas', () => {
  it('deve chamar prisma.seguidores_pagina.findMany com o id_utilizador e include correto', async () => {
    const mockId = 1;
    const mockReturn = [{ id_pagina: 2 }];
    mockFind.mockResolvedValue(mockReturn);

    const result = await getPaginasSeguidas(mockId);

    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador: mockId },
      include: { pagina_freguesia: true }
    });
    expect(result).toEqual(mockReturn);
  });
});