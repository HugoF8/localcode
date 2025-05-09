const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    pedido_pagina: { create: mockCreate, findMany: mockFind }
  }))
}));

const mockCreateMorada = jest.fn();
jest.mock('../../src/services/morada.service', () => ({ createMorada: mockCreateMorada }));

const {
  createPedidoPagina,
  getPedidoPendente,
  getPedidoAprovado,
  getPedidoReprovado
} = require('../../src/services/pedidoPagina.service');

describe('createPedidoPagina', () => {
  it('usa id_morada quando fornecido', async () => {
    const data = { id_utilizador: 1, id_morada: 10, nomefreguesia: 'X', dados_comprovacao: 'Y' };
    const expected = { id_pedido: 5, ...data };
    mockCreate.mockResolvedValue(expected);

    const result = await createPedidoPagina(data);

    expect(mockCreateMorada).not.toHaveBeenCalled();
    expect(mockCreate).toHaveBeenCalledWith({ data });
    expect(result).toEqual(expected);
  });

  it('cria morada quando id_morada não fornecido', async () => {
    const data = { id_utilizador: 1, freguesia:'F', rua:'R', cidade:'C', codigo_postal:'1234', nomefreguesia:'X', dados_comprovacao:'Y' };
    mockCreateMorada.mockResolvedValue({ id_morada: 20 });
    const created = {
      id_utilizador: 1,
      id_morada: 20,
      nomefreguesia: 'X',
      dados_comprovacao: 'Y',
      estado_pedido: 'pendente'
    };
    const mockReturn = { id_pedido: 6, ...created };
    mockCreate.mockResolvedValue(mockReturn);

    const result = await createPedidoPagina(data);

    expect(mockCreateMorada).toHaveBeenCalledWith({
      freguesia:'F', rua:'R', cidade:'C', codigo_postal:1234
    });
    expect(mockCreate).toHaveBeenCalledWith({ data: created });
    expect(result).toEqual(mockReturn);
  });
});

describe('getPedidoPendente', () => {
  it('chama findMany com where, include e orderBy corretos', async () => {
    mockFind.mockResolvedValue([{ id_pedido:1 }]);
    const res = await getPedidoPendente(1);
    expect(mockFind).toHaveBeenCalledWith({
      where: { estado_pedido: 'pendente' },
      include: { morada: true },
      orderBy: { data_pedido: 'desc' }
    });
    expect(res).toEqual([{ id_pedido:1 }]);
  });
});

describe('getPedidoAprovado', () => {
  it('chama findMany com where, include e orderBy corretos', async () => {
    mockFind.mockResolvedValue([{ id_pedido:2 }]);
    const res = await getPedidoAprovado(1);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador: 1, estado_pedido: 'aprovado' },
      include: { morada: true },
      orderBy: { data_pedido: 'desc' }
    });
    expect(res).toEqual([{ id_pedido:2 }]);
  });
});

describe('getPedidoReprovado', () => {
  it('chama findMany com where, include e orderBy corretos', async () => {
    mockFind.mockResolvedValue([{ id_pedido:3 }]);
    const res = await getPedidoReprovado(2);
    expect(mockFind).toHaveBeenCalledWith({
      where: { id_utilizador: 2, estado_pedido: 'reprovado' },
      include: { morada: true },
      orderBy: { data_pedido: 'desc' }
    });
    expect(res).toEqual([{ id_pedido:3 }]);
  });
});