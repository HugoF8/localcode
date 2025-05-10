const mockFind = jest.fn();
const mockUpdate = jest.fn();
const mockFindUnique = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => {
  return {
    tipo_notificacao: {
      Verificacao: 'Verificacao',
      Aprovado: 'Aprovado',
      Recusado: 'Recusado',
    },
    PrismaClient: jest.fn().mockImplementation(() => ({
      post: {
        findMany: mockFind,
        update: mockUpdate,
        findUnique: mockFindUnique,
      }
    })),
  };
});

jest.mock('../../src/services/notificacao.service', () => ({
  createNotificacao: mockCreateNotificacao,
}));

const { getPostPendente, atualizarEstadoPost } = require('../../src/services/post.service');

describe('getPostPendente', () => {
  it('deve chamar prisma.post.findMany com filtro, include e orderBy corretos', async () => {
    const id_pagina = 42;
    const mockReturn = [{ id_post: 1 }];
    mockFind.mockResolvedValue(mockReturn);

    const result = await getPostPendente(id_pagina);

    expect(mockFind).toHaveBeenCalledWith({
      where: {
        id_pagina,
        estado_post: 'pendente',
        aprovacoes: {
          lt: 4
        }
      },
      include: {
        utilizador: {
          select: {
            nome: true,
            perfil: {
              select: {
                foto_perfil: true
              }
            }
          }
        }
      },
      orderBy: {
        data_post: 'desc'
      }
    });

    expect(result).toEqual(mockReturn);
  });
});


describe('atualizarEstadoPost', () => {
  it('deve aprovar post e criar notificação de Verificacao', async () => {
    const id_post = 1;
    const bolean = true;
    const postAtual = {
      id_post,
      id_utilizador: 10,
      aprovacoes: 0,
      estado_post: 'pendente'
    };
    const postAtualizado = {
      ...postAtual,
      aprovacoes: 1,
      estado_post: 'pendente'
    };

    mockFindUnique.mockResolvedValue(postAtual);
    mockUpdate.mockResolvedValue(postAtualizado);

    const result = await atualizarEstadoPost(bolean, id_post);

    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_post } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_post },
      data: {
        aprovacoes: 1,
        estado_post: 'pendente'
      }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: postAtual.id_utilizador,
      id_post,
      tipo_notificacao: 'Verificacao'
    });
    expect(result).toEqual(postAtualizado);
  });

  it('deve aprovar post e ativá-lo após 3 aprovações', async () => {
    const id_post = 2;
    const bolean = true;
    const postAtual = {
      id_post,
      id_utilizador: 20,
      aprovacoes: 2,
      estado_post: 'pendente'
    };
    const postAtualizado = {
      ...postAtual,
      aprovacoes: 3,
      estado_post: 'ativo'
    };

    mockFindUnique.mockResolvedValue(postAtual);
    mockUpdate.mockResolvedValue(postAtualizado);

    const result = await atualizarEstadoPost(bolean, id_post);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_post },
      data: {
        aprovacoes: 3,
        estado_post: 'ativo'
      }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: postAtual.id_utilizador,
      id_post,
      tipo_notificacao: 'Aprovado'
    });
    expect(result).toEqual(postAtualizado);
  });

  it('deve reprovar post e criar notificação de Recusado', async () => {
    const id_post = 3;
    const bolean = false;
    const postAtual = {
      id_post,
      id_utilizador: 30,
      aprovacoes: 1,
      estado_post: 'pendente'
    };
    const postAtualizado = {
      ...postAtual,
      estado_post: 'inativo'
    };

    mockFindUnique.mockResolvedValue(postAtual);
    mockUpdate.mockResolvedValue(postAtualizado);

    const result = await atualizarEstadoPost(bolean, id_post);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_post },
      data: {
        aprovacoes: 1,
        estado_post: 'inativo'
      }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: postAtual.id_utilizador,
      id_post,
      tipo_notificacao: 'Recusado'
    });
    expect(result).toEqual(postAtualizado);
  });
});
