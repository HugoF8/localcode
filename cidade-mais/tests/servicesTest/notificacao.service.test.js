const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    notificacao: {
      create: mockCreate,
      findMany: mockFind
    }
  }))
}));

const {
  createNotificacao,
  getNotificacaoPorUtilizador
} = require('../../src/services/notificacao.service');

describe('createNotificacao', () => {
  it('deve chamar prisma.notificacao.create com os dados corretos', async () => {
    const data = { id_utilizador: 1, id_post: 2, tipo_notificacao: 'X' };
    const retorno = { id_notificacao: 10, ...data };
    mockCreate.mockResolvedValue(retorno);

    const res = await createNotificacao(data);

    expect(mockCreate).toHaveBeenCalledWith({ data });
    expect(res).toEqual(retorno);
  });
});

describe('getNotificacaoPorUtilizador', () => {
  it('deve chamar prisma.notificacao.findMany com where e orderBy', async () => {
    const id_utilizador = 42;
    const retorno = [{ id_notificacao: 1 }];
    mockFind.mockResolvedValue(retorno);

    const res = await getNotificacaoPorUtilizador(id_utilizador);

    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador },
      orderBy: { data: 'desc' }
    });
    expect(res).toEqual(retorno);
  });
});