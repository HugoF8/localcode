const mockCreate = jest.fn();
const mockUpdate = jest.fn();

const mockTipoUtilizador = {
    admin: 'admin',
    moderador: 'moderador',
    utilizador: 'utilizador',
  };


jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      utilizador: {
        create: mockCreate,
        update: mockUpdate,
      },
    })),
    tipo_utilizador: mockTipoUtilizador,
  };
});

const { tipo_utilizador } = require('@prisma/client');
const { createUtilizador, alterarTipoUser } = require('../../src/services/utilizador.service');

describe('createUtilizador', () => {
  it('cria um novo utilizador com os dados fornecidos', async () => {
    const mockData = {
      nome: 'Joana',
      email: 'joana@example.com',
      tipo_utilizador: 'utilizador',
    };

    const mockCreated = {
      id_utilizador: 1,
      ...mockData,
    };

    mockCreate.mockResolvedValue(mockCreated);

    const result = await createUtilizador(mockData);

    expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockCreated);
  });
});

describe('alterarTipoUser', () => {
  it('altera o tipo de utilizador corretamente', async () => {
    const mockId = 1;
    const novoTipo = 'admin';

    const mockUpdated = {
      id_utilizador: mockId,
      tipo_utilizador: novoTipo,
    };

    mockUpdate.mockResolvedValue(mockUpdated);

    const result = await alterarTipoUser(novoTipo, mockId);

    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id_utilizador: mockId },
      data: { tipo_utilizador: novoTipo },
    });

    expect(result).toEqual(mockUpdated);
  });
});
