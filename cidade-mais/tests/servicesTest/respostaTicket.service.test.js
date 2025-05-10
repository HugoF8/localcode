// tests/servicesTest/respostaTicket.service.test.js
const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockTicketUpdate = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => ({
  // inclui o enum que o serviço utiliza
  tipo_notificacao: {
    Sucesso: 'Sucesso',
    Insucesso: 'Insucesso'
  },
  PrismaClient: jest.fn().mockImplementation(() => ({
    resposta_ticket: { create: mockCreate, findMany: mockFind },
    ticket: { update: mockTicketUpdate }
  }))
}));

jest.mock('../../src/services/notificacao.service', () => ({
  createNotificacao: mockCreateNotificacao
}));

const { createResposta, getRespostasPorUtilizador } = require('../../src/services/respostaTicket.service');

describe('getRespostasPorUtilizador', () => {
  it('deve chamar prisma.resposta_ticket.findMany com where e orderBy corretos', async () => {
    const id_utilizador = 1;
    const mockReturn = [{ id_resposta: 5 }];
    mockFind.mockResolvedValue(mockReturn);

    const res = await getRespostasPorUtilizador(id_utilizador);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador, id_ticket: undefined },
      orderBy: { data_post: 'desc' }
    });
    expect(res).toEqual(mockReturn);
  });
});

describe('createResposta', () => {
  const baseData = {
    id_ticket: 10,
    id_utilizador: 1,
    conteudo_resposta: 'Ok',
    estado_resposta: 'resolvido'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma resposta, enviar notificação de sucesso e fechar o ticket', async () => {
    const novaResposta = { id_resposta: 100, ...baseData };
    mockCreate.mockResolvedValue(novaResposta);
    mockTicketUpdate.mockResolvedValue({ id_ticket: baseData.id_ticket, estado_ticket: 'fechado' });

    const res = await createResposta(baseData);

    expect(mockCreate).toHaveBeenCalledWith({ data: baseData });

    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: baseData.id_utilizador,
      id_ticket: baseData.id_ticket,
      tipo_notificacao: 'Sucesso'
    });

    expect(mockTicketUpdate).toHaveBeenCalledWith({
      where: { id_ticket: baseData.id_ticket },
      data: { estado_ticket: 'fechado' }
    });

    expect(res).toEqual(novaResposta);
  });

  it('deve enviar notificação de insucesso se a resposta não for resolvida', async () => {
    const dataInsucesso = { ...baseData, id_ticket: 20, estado_resposta: 'Insucesso', conteudo_resposta: 'Não' };
    const novaResposta = { id_resposta: 200, ...dataInsucesso };
    mockCreate.mockResolvedValue(novaResposta);
    mockTicketUpdate.mockResolvedValue({ id_ticket: dataInsucesso.id_ticket, estado_ticket: 'fechado' });

    const res = await createResposta(dataInsucesso);

    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      id_utilizador: dataInsucesso.id_utilizador,
      id_ticket: dataInsucesso.id_ticket,
      tipo_notificacao: 'Insucesso'
    });

    expect(res).toEqual(novaResposta);
  });
});
