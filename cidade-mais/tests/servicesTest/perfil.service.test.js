const mockCreate = jest.fn();
const mockFindFirst = jest.fn();
const mockUpdate = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    perfil: {
      create: mockCreate,
      findFirst: mockFindFirst,
      update: mockUpdate
    }
  }))
}));


const { createPerfil, atualizarFotoPerfil } = require('../../src/services/perfil.service');

describe('createPerfil', () => {
  it('deve chamar prisma.perfil.create com os dados corretos', async () => {
    const data = { id_utilizador: 5 };
    const retorno = { id_perfil: 10, id_utilizador: 5, foto_perfil: null };
    mockCreate.mockResolvedValue(retorno);

    const res = await createPerfil(data); // e não data.id_utilizador
    expect(mockCreate).toHaveBeenCalledWith({ data });
    expect(res).toEqual(retorno);
  });
});

describe('atualizarFotoPerfil', () => {
  it('atualiza a foto do perfil corretamente', async () => {
    const id_utilizador = 5;
    const caminho = '/caminho/para/uploads/foto5.png';
    const perfilAntigo = { id_perfil: 10, id_utilizador, foto_perfil: 'old.png' };
    const perfilAtualizado = { ...perfilAntigo, foto_perfil: 'uploads/foto5.png' };

    mockFindFirst.mockResolvedValue(perfilAntigo);
    mockUpdate.mockResolvedValue(perfilAtualizado);

    const result = await atualizarFotoPerfil(id_utilizador, caminho);

    expect(mockFindFirst).toHaveBeenCalledWith({ where: { id_utilizador } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_perfil: perfilAntigo.id_perfil },
      data: { foto_perfil: 'uploads/foto5.png' }
    });
    expect(result).toEqual({ foto_perfil: 'uploads/foto5.png' });
  });

  it('lança erro se o perfil não for encontrado', async () => {
    mockFindFirst.mockResolvedValue(null);
    await expect(atualizarFotoPerfil(99, 'x.png')).rejects.toThrow('Perfil não encontrado');
  });
});
