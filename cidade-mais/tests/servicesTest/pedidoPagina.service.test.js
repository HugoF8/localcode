const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockCreatePagina = jest.fn();
const mockCreateNotificacao = jest.fn();

// Define the mocked enums that we'll use in the test
const mockEstadoPedido = {
  pendente: 'pendente',
  aprovado: 'aprovado',
  reprovado: 'reprovado'
};

const mockTipoNotificacao = {
  Aprovado: 'Aprovado',
  Recusado: 'Recusado',
  Validacao: 'Validacao', 
  Verificacao: 'Verificacao',
  Sucesso: 'Sucesso',
  Insucesso: 'Insucesso'
};

// Mock the Prisma Client
jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      pedido_pagina: {
        findUnique: mockFindUnique,
        update: mockUpdate,
      },
      pagina_freguesia: {
        create: mockCreatePagina,
      },
      notificacao: {
        create: mockCreateNotificacao,
      },
    })),
    estado_pedido: mockEstadoPedido,
    tipo_notificacao: mockTipoNotificacao
  };
});

// Import here ensures it's after the mock
const { estado_pedido, tipo_notificacao } = require('@prisma/client');
const { atualizarEstadoPedido } = require('../../src/services/pedidoPagina.service');

describe('atualizarEstadoPedido', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('atualiza o estado para "aprovado" e cria página e notificação', async () => {
    const id_pedido = 1;
    const bol = true;

    const pedidoAtual = {
      id_pedido,
      id_utilizador: 10,
      id_morada: 20,
      dados_comprovacao: "teste",
      nomefreguesia: "Freguesia Teste",
      estado_pedido: estado_pedido.pendente,  // Usa o enum importado
    };

    const pedidoAtualizado = {
      id_pedido,
      id_utilizador: 10,
      id_morada: 20,
      dados_comprovacao: "teste",
      nomefreguesia: "Freguesia Teste",
      estado_pedido: estado_pedido.aprovado,  // Usa o enum importado
    };

    mockFindUnique.mockResolvedValue(pedidoAtual);
    mockUpdate.mockResolvedValue(pedidoAtualizado);
    mockCreatePagina.mockResolvedValue({});
    mockCreateNotificacao.mockResolvedValue({});

    const result = await atualizarEstadoPedido(id_pedido, bol);

    // Verifica as chamadas no mock
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_pedido } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_pedido },
      data: { estado_pedido: estado_pedido.aprovado },  // Usa o enum correto
    });
    expect(mockCreatePagina).toHaveBeenCalledWith({
      data: {
        id_utilizador: pedidoAtual.id_utilizador,
        id_morada: pedidoAtual.id_morada,
        nome_pagina: pedidoAtual.nomefreguesia,
      },
    });
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data: {  // Assuming the create method expects a data object
        id_utilizador: pedidoAtualizado.id_utilizador,
        id_pedido: pedidoAtualizado.id_pedido,
        tipo_notificacao: tipo_notificacao.Aprovado,  // Usa o enum correto
      }
    });

    expect(result).toEqual(pedidoAtualizado);
  });

  // Adicionar outros testes para o caso `bol = false` (reprovado)
});