const mockFind = jest.fn(); // cria o mock antes

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        pagina_freguesia: {
          findMany: mockFind,
        },
      })),
    };
  });
  

const { pesquisaPagina, createPaginaFreguesia } = require('../../src/services/paginaFreguesia.service');

describe('pesquisaPagina', () => {
  it('deve chamar prisma.pagina_freguesia.findMany com o filtro correto', async () => {
    const pesquisa = "teste";
    const mockReturn = [
      { id_morada: 1, id_utilizador: 11, nome_pagina: "teste" },
      { id_morada: 2, id_utilizador: 12, nome_pagina: "teste2" },
      { id_morada: 3, id_utilizador: 13, nome_pagina: "AtesteA" },
      { id_morada: 4, id_utilizador: 14, nome_pagina: "TESTE" },
    ];

    mockFind.mockResolvedValue(mockReturn);

    const result = await pesquisaPagina(pesquisa);
    expect(mockFind).toHaveBeenCalledWith({
      where: {
        nome_pagina: {
          contains: pesquisa,
          mode: 'insensitive',
        },
      },
    });

    expect(result).toEqual(mockReturn);
  });
});
