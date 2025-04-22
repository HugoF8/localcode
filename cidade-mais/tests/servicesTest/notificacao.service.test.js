const mockCreate = jest.fn();
const mockFind = jest.fn();

const mockTipoNotificacao = {
    Aprovado: 'Aprovado',
    Recusado: 'Recusado',
    Validacao: 'Validacao', 
    Verificacao: 'Verificacao',
    Sucesso: 'Sucesso',
    Insucesso: 'Insucesso'
};

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        notificacao: {
          create: mockCreate,
          findMany: mockFind,
        },
      })),
      tipo_notificacao: mockTipoNotificacao,
    };
});

const { tipo_notificacao } = require('@prisma/client');
const { createNotificacao, getNotificacaoPorUtilizador } = require('../../src/services/notificacao.service');

describe('createNotificacao', () => {
    it('deve chamar prisma.notificacao.create com os dados corretos', async () => {
      const mockData = {
        id_utilizador: 1,
        id_pagina: 2,
        id_post: 3,
        id_ticket: 4,
        conteudo_notificacao: "Teste"
      };
      const mockReturn = { id_notificacao: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createNotificacao(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
});

describe('getNotificacaoPorUtilizador', () => {
    it('deve chamar prisma.notificacao.findMany com o id_utilizador correto', async () => {
      const id_utilizador = 42;
      const mockReturn = [
        { id_notificacao: 1, id_utilizador: id_utilizador },
        { id_notificacao: 2, id_utilizador: id_utilizador },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getNotificacaoPorUtilizador(id_utilizador);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_utilizador: id_utilizador },
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
  });