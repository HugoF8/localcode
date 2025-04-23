const mockFind = jest.fn();
const mockCreate = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        pagina_freguesia: {
          findMany: mockFind,
          create: mockCreate
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

describe('createPaginaFreguesia', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma nova página de freguesia com os dados fornecidos', async () => {
    const dadosPagina = {
      id_morada: 1,
      id_utilizador: 2,
      nome_pagina: 'Freguesia de Teste',
      descricao: 'Uma freguesia de exemplo para teste.',
      foto_perfil: 'imagens/perfil.png',
      foto_capa: 'imagens/capa.png'
    };

    const paginaCriada = {
      id_pagina: 10,
      ...dadosPagina
    };

    mockCreate.mockResolvedValue(paginaCriada);

    const result = await createPaginaFreguesia(dadosPagina);

    expect(mockCreate).toHaveBeenCalledWith({
      data: dadosPagina
    });

    expect(result).toEqual(paginaCriada);
  });
});
