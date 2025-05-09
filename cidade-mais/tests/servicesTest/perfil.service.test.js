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

    const res = await createPerfil(data.id_utilizador);

    expect(mockCreate).toHaveBeenCalledWith({ data: { id_utilizador: data.id_utilizador } });
    expect(res).toEqual(retorno);
  });
});

describe('atualizarFotoPerfil', () => {
  it('atualiza a foto do perfil corretamente', async () => {
    const id_perfil = 10;
    const caminho = 'imagens/foto5.png';
    const perfilAtualizado = { id_perfil, id_utilizador: 5, foto_perfil: caminho };
    
    mockFind.mockResolvedValue({ id_perfil, id_utilizador: 5, foto_perfil: 'old.png' });
    mockUpdate.mockResolvedValue(perfilAtualizado);

    const result = await atualizarFotoPerfil(id_perfil, caminho);

    expect(mockFind).toHaveBeenCalledWith({ where: { id_perfil } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_perfil },
      data: { foto_perfil: caminho }
    });
    expect(result).toEqual(perfilAtualizado);
  });

  it('lança erro se o perfil não for encontrado', async () => {
    mockFind.mockResolvedValue(null);
    await expect(atualizarFotoPerfil(99, 'x.png')).rejects.toThrow('Perfil não encontrado');
  });
});