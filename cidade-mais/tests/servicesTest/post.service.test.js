const mockFind = jest.fn();
const mockUpdate = jest.fn();
const mockFindUnique = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    post: {
      findMany: mockFind,
      update: mockUpdate,
      findUnique: mockFindUnique
    }
  }))
}));

jest.mock('../../src/services/notificacao.service', () => ({ createNotificacao: mockCreateNotificacao }));

const { getPostPendente, atualizarEstadoPost } = require('../../src/services/post.service');

describe('getPostPendente', () => {
  it('deve chamar prisma.post.findMany com filtro, include e orderBy corretos', async () => {
    const id_pagina = 42;
    const mockReturn = [{ id_post: 1 }];
    mockFind.mockResolvedValue(mockReturn);

    const result = await getPostPendente(id_pagina);

    expect(mockFind).toHaveBeenCalledWith({
      where: { id_pagina, estado_post: 'pendente' },
      include: { utilizador: { select: { nome: true, perfil: { select: { foto_perfil: true } } } } },
      orderBy: { data_post: 'desc' }
    });
    expect(result).toEqual(mockReturn);
  });
});

describe('atualizarEstadoPost', () => {
  it('deve atualizar post e criar notificação para aprovação', async () => {
    const id_post = 5;
    const bolean = true;
    const updatedPost = { id_post, id_utilizador: 99, aprovacoes: 3, estado_post: 'aprovado' };
    mockUpdate.mockResolvedValue(updatedPost);

    const result = await atualizarEstadoPost(bolean, id_post);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_post },
      data: { aprovacoes: { increment: 1 }, estado_post: 'aprovado' }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: updatedPost.id_utilizador,
      id_post,
      tipo_notificacao: 'post_aprovado'
    });
    expect(result).toEqual(updatedPost);
  });

  it('deve atualizar post e criar notificação para reprovação', async () => {
    const id_post = 6;
    const bolean = false;
    const updatedPost = { id_post, id_utilizador: 100, aprovacoes: -1, estado_post: 'reprovado' };
    mockUpdate.mockResolvedValue(updatedPost);

    const result = await atualizarEstadoPost(bolean, id_post);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_post },
      data: { aprovacoes: { increment: -1 }, estado_post: 'reprovado' }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: updatedPost.id_utilizador,
      id_post,
      tipo_notificacao: 'post_reprovado'
    });
    expect(result).toEqual(updatedPost);
  });
});
