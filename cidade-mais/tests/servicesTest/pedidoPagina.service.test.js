const mockFindUnique = jest.fn();
const mockUpdate = jest.fn();
const mockCreatemoradaid_morada = jest.fn();
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
      pedido_moradaid_morada: {
        findUnique: mockFindUnique,
        update: mockUpdate,
      },
      moradaid_morada_freguesia: {
        create: mockCreatemoradaid_morada,
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
const { atualizarEstadoPedido, getPedidoPendente, getPedidoAprovado, getPedidoRecusado } = require('../../src/services/pedidoPagina.service');

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
    mockCreatemoradaid_morada.mockResolvedValue({});
    mockCreateNotificacao.mockResolvedValue({});

    const result = await atualizarEstadoPedido(id_pedido, bol);

    // Verifica as chamadas no mock
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_pedido } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_pedido },
      data: { estado_pedido: estado_pedido.aprovado },  // Usa o enum correto
    });
    expect(mockCreatemoradaid_morada).toHaveBeenCalledWith({
      data: {
        id_utilizador: pedidoAtual.id_utilizador,
        id_morada: pedidoAtual.id_morada,
        nome_moradaid_morada: pedidoAtual.nomefreguesia,
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

  it('atualiza o estado para "reprovado" e cria página e notificação', async () => {
    const id_pedido = 1;
    const bol = false;

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
      estado_pedido: estado_pedido.reprovado,  // Usa o enum importado
    };

    mockFindUnique.mockResolvedValue(pedidoAtual);
    mockUpdate.mockResolvedValue(pedidoAtualizado);
    mockCreatemoradaid_morada.mockResolvedValue({});
    mockCreateNotificacao.mockResolvedValue({});

    const result = await atualizarEstadoPedido(id_pedido, bol);

    // Verifica as chamadas no mock
    expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_pedido } });
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_pedido },
      data: { estado_pedido: estado_pedido.reprovado },  // Usa o enum correto
    });
   
    expect(mockCreateNotificacao).toHaveBeenCalledWith({
      data: {  // Assuming the create method expects a data object
        id_utilizador: pedidoAtualizado.id_utilizador,
        id_pedido: pedidoAtualizado.id_pedido,
        tipo_notificacao: tipo_notificacao.Recusado,  // Usa o enum correto
      }
    });

    expect(result).toEqual(pedidoAtualizado);
  });

  // Adicionar outros testes para o caso `bol = false` (reprovado)
});


describe('getPedidoPendente', () => {
  it('get do pedido com os dados corretos e obter o resultado esperado', async () => {
    const id_morada = 42
    const mockReturn = [
      { id_pedido: 1, id_utilizador:11, id_morada:42, dados_comprovacao:"Teste", aprovacoes:2},
      { id_pedido: 2, id_utilizador:12, id_morada:42, dados_comprovacao:"Teste2", aprovacoes:4 },
    ];

    mockFind.mockResolvedValue([mockReturn[0]]);
    const result = await getPedidoPendente(id_morada);
    
    expect(mockFind).toHaveBeenCalledWith({
      where: {
        id_morada:42,
        estado_pedido: mockEstadoPedido.pendente,
        aprovacoes:{lt:4},
      },
    });
    expect(result).toContainEqual(mockReturn[0]);
    expect(result).not.toContainEqual(mockReturn[1]);
  })   
});

describe('getPedidoAprovado', () => {
  it('get do pedido com os dados corretos e obter o resultado esperado', async () => {
    const id_utilizador = 11
    const mockReturn = [
      { id_pedido: 1, id_utilizador:11, id_pagina:42, dados_comprovacao:"Teste", aprovacoes:2,estado_pedido: mockEstadoPedido.ativo },
      { id_pedido: 3, id_utilizador:11, id_pagina:42, dados_comprovacao:"Teste3", aprovacoes:2,estado_pedido: mockEstadoPedido.inativo },
      { id_pedido: 2, id_utilizador:12, id_pagina:43, dados_comprovacao:"Teste2", aprovacoes:4, estado_pedido: mockEstadoPedido.ativo },
    ];

    mockFind.mockResolvedValue([mockReturn[0]]);;
    const result = await getPedidoAprovado(id_utilizador);
    
    expect(mockFind).toHaveBeenCalledWith({
      where: {
        id_utilizador: id_utilizador,
        estado_pedido: mockEstadoPedido.ativo
      },
    });
    expect(result).toContainEqual(mockReturn[0]);
    expect(result).not.toContainEqual(mockReturn[2]);
    expect(result).not.toContainEqual(mockReturn[1]);
  })   
});

describe('getPedidoRecusado', () => {
  it('get do pedido com os dados corretos e obter o resultado esperado', async () => {
    const id_utilizador = 11
    const mockReturn = [
      { id_pedido: 1, id_utilizador:11, id_pagina:42, dados_comprovacao:"Teste", aprovacoes:2,estado_pedido: mockEstadoPedido.ativo },
      { id_pedido: 3, id_utilizador:11, id_pagina:42, dados_comprovacao:"Teste3", aprovacoes:2,estado_pedido: mockEstadoPedido.inativo },
      { id_pedido: 2, id_utilizador:12, id_pagina:43, dados_comprovacao:"Teste2", aprovacoes:4, estado_pedido: mockEstadoPedido.ativo },
    ];

    mockFind.mockResolvedValue([mockReturn[1]]);;
    const result = await getPedidoRecusado(id_utilizador);
    
    expect(mockFind).toHaveBeenCalledWith({
      where: {
        id_utilizador: id_utilizador,
        estado_pedido: mockEstadoPedido.inativo
      },
    });
    expect(result).toContainEqual(mockReturn[1]);
    expect(result).not.toContainEqual(mockReturn[2]);
    expect(result).not.toContainEqual(mockReturn[0]);
  })   
});