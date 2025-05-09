const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    resposta_ticket: { create: mockCreate, findMany: mockFind }
  }))
}));

jest.mock('../../src/services/notificacao.service', () => ({
  createNotificacao: mockCreateNotificacao
}));

const { createResposta, getRespostasPorUtilizador } = require('../../src/services/respostaTicket.service');

describe('getRespostasPorUtilizador', () => {
  it('deve chamar prisma.resposta_ticket.findMany com o id_utilizador correto', async () => {
    const id_utilizador = 1;
    const mockReturn = [{ id_resposta: 5 }];
    mockFind.mockResolvedValue(mockReturn);

    const res = await getRespostasPorUtilizador(id_utilizador);

    expect(mockFind).toHaveBeenCalledWith({ where: { id_utilizador } });
    expect(res).toEqual(mockReturn);
  });
});

describe('createResposta', () => {
  it('deve criar uma resposta, enviar notificação de sucesso e fechar o ticket', async () => {
    const mockData = { id_ticket: 10, id_utilizador: 1, conteudo_resposta: 'Ok', estado_resposta: 'Sucesso' };
    mockCreate.mockResolvedValue({ id_resposta: 100, ...mockData });
    
    const res = await createResposta(mockData);

    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        ticket: { connect: { id_ticket: mockData.id_ticket } },
        utilizador: { connect: { id_utilizador: mockData.id_utilizador } },
        conteudo_resposta: mockData.conteudo_resposta,
        estado_resposta: mockData.estado_resposta
      },
      include: { pagina_freguesia: true, post: true, ticket: true }
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data: {
        id_utilizador: mockData.id_utilizador,
        id_ticket: mockData.id_ticket,
        tipo_notificacao: mockData.estado_resposta
      },
      include: { pagina_freguesia: true, post: true, ticket: true }
    });
    expect(res).toEqual({ id_resposta: 100, ...mockData });
  });

  it('deve enviar notificação de insucesso se a resposta não for resolvida', async () => {
    const mockData = { id_ticket: 20, id_utilizador: 1, conteudo_resposta: 'Não', estado_resposta: 'Insucesso' };
    mockCreate.mockResolvedValue({ id_resposta: 200, ...mockData });

    const res = await createResposta(mockData);

    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data: {
        id_utilizador: mockData.id_utilizador,
        id_ticket: mockData.id_ticket,
        tipo_notificacao: mockData.estado_resposta
      },
      include: { pagina_freguesia: true, post: true, ticket: true }
    });
    expect(res).toEqual({ id_resposta: 200, ...mockData });
  });
});