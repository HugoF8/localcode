
const mockCreate = jest.fn();
const mockFind = jest.fn();

jest.mock('@prisma/client', () => {
  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      comentario: {
        create: mockCreate,
        findMany: mockFind,
      },
    })),
  };
});

const { createComentario, getComentarioPost} = require('../../src/services/comentario.service');

describe('createComentario', () => {
  it('deve chamar prisma.comentario.create com os dados corretos', async () => {
    const mockData = {
      id_post: 1,
      id_utilizador: 2,
      conteudo_comentario: "Teste"
    };
    const mockReturn = { id_comentario: 1, ...mockData };

    mockCreate.mockResolvedValue(mockReturn);

    const result = await createComentario(mockData);

    expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
    expect(result).toEqual(mockReturn);
  });
});

describe('getComentarioPost', () => {
    it('deve chamar prisma.comentario.findMany com o id_post correto', async () => {
      const id_post = 42;
      const mockReturn = [
        { id_comentario: 1, conteudo_comentario: 'Comentário 1', id_post: id_post },
        { id_comentario: 2, conteudo_comentario: 'Comentário 2', id_post: id_post },
      ];
  
      mockFind.mockResolvedValue([mockReturn[0]]);
  
      const result = await getComentarioPost(id_post);
  
      expect(mockFind).toHaveBeenCalledWith({
        where: { id_post: id_post },
      });

      expect(result).toContainEqual(mockReturn[0]);
      expect(result).not.toContainEqual(mockReturn[1]);
    });
  });