const mockCreate = jest.fn();
const mockFind = jest.fn();
const mockUpdateTicket = jest.fn();
const mockCreateNotificacao = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        resposta_ticket: {
          create: mockCreate,
          findMany: mockFind,
        },
        notificacao:{
          create:mockCreateNotificacao,
        },
        ticket: {
          update: mockUpdateTicket,
        },
      })),
      tipo_notificacao: mockTipoNotificacao,
    };
  });

  const mockTipoNotificacao = {
    Aprovado: 'Aprovado',
    Recusado: 'Recusado',
    Validacao: 'Validacao', 
    Verificacao: 'Verificacao',
    Sucesso: 'Sucesso',
    Insucesso: 'Insucesso'
};



  const { createResposta, getRespostasPorUtilizador } = require('../../src/services/respostaTicket.service');



  describe('getRespostasPorUtilizador', () => {
    it('deve chamar prisma.resposta_ticket.findMany com o id_utilizador correto', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_resposta: 1, conteudo_resposta: 'Resposta 1', id_utilizador: id_utilizador },
        { id_resposta: 2, conteudo_resposta: 'Resposta 2', id_utilizador: id_utilizador },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getRespostasPorUtilizador(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador },
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
  });

  describe('createResposta', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('deve criar uma resposta, enviar notificação de sucesso e fechar o ticket', async () => {
      const mockData = {
        id_utilizador: 1,
        id_ticket: 10,
        conteudo: 'Resposta aqui',
        estado_resposta: 'resolvido'
      };
  
      const novaResposta = {
        id_resposta: 100,
        ...mockData
      };
  
      mockCreate.mockResolvedValue(novaResposta);
  
      const result = await createResposta(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
  
      expect(mockCreateNotificacao).toHaveBeenCalledWith({
        data: {
          id_utilizador: mockData.id_utilizador,
          id_ticket: mockData.id_ticket,
          tipo_notificacao: mockTipoNotificacao.Sucesso,
        },
      });
  
      expect(mockUpdateTicket).toHaveBeenCalledWith({
        where: { id_ticket: mockData.id_ticket },
        data: { estado_ticket: 'fechado' },
      });
  
      expect(result).toEqual(novaResposta);
    });
  
    it('deve enviar notificação de insucesso se a resposta não for resolvida', async () => {
      const mockData = {
        id_utilizador: 1,
        id_ticket: 20,
        conteudo: 'Não resolvido',
        estado_resposta: 'nao_resolvido'
      };
  
      const novaResposta = {
        id_resposta: 101,
        ...mockData
      };
  
      mockCreate.mockResolvedValue(novaResposta);
  
      const result = await createResposta(mockData);
  
      expect(mockCreateNotificacao).toHaveBeenCalledWith({
        data: {
          id_utilizador: mockData.id_utilizador,
          id_ticket: mockData.id_ticket,
          tipo_notificacao: mockTipoNotificacao.Insucesso,
        },
      });
  
      expect(mockUpdateTicket).toHaveBeenCalledWith({
        where: { id_ticket: mockData.id_ticket },
        data: { estado_ticket: 'fechado' },
      });
  
      expect(result).toEqual(novaResposta);
    });
  });