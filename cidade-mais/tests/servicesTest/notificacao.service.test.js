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

// Enum para o tipo_notificacao diretamente no teste
const tipo_notificacao = {
  Aprovado: 'Aprovado',
  Recusado: 'Recusado',
  Validacao: 'Validacao',
  Verificacao: 'Verificacao',
  Sucesso: 'Sucesso',
  Insucesso: 'Insucesso'
};

describe('createNotificacao', () => {
  it('deve chamar prisma.notificacao.create com os dados corretos', async () => {
    const data = { 
      id_utilizador: 1, 
      id_post: 2, 
      tipo_notificacao: tipo_notificacao.Verificacao 
    };
    const retorno = { id_notificacao: 10, ...data };

    mockCreate.mockResolvedValue(retorno);

    const createData = {
      tipo_notificacao: tipo_notificacao.Verificacao,  
      utilizador: { connect: { id_utilizador: 1 } },
      post: { connect: { id_post: 2 } },
      include: { // Mantendo o include aqui
        post: true,
        ticket: true,
        pagina_freguesia: true
      }
    };

    const res = await createNotificacao(data);

    // Aqui o "include" está presente na expectativa
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        tipo_notificacao: tipo_notificacao.Verificacao,  
        utilizador: { connect: { id_utilizador: 1 } },
        post: { connect: { id_post: 2 } }
      },
      include: { // Incluindo o include na chamada
        post: true,
        ticket: true,
        pagina_freguesia: true
      }
    });
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
