const mockCreate = jest.fn();
const mockFindMany = jest.fn();
const mockFindFirst = jest.fn();
const mockUpdate = jest.fn();

jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        perfil: {
          create: mockCreate,
          findMany: mockFindMany,
          findFirst: mockFindFirst,
          update: mockUpdate,
        },
      })),
    };
  });

const { createPerfil, atualizarFotoPerfil } = require('../../src/services/perfil.service');

describe('createPerfil', () => {
    it('deve chamar prisma.Perfil.create com os dados corretos', async () => {
      const mockData = {
        id_utilizador: 1,
        foto_perfil: "Caminho",
        foto_capa: "Caminho",
        biografia: "Teste",
      };
      const mockReturn = { id_perfil: 1, ...mockData };
  
      mockCreate.mockResolvedValue(mockReturn);
  
      const result = await createPerfil(mockData);
  
      expect(mockCreate).toHaveBeenCalledWith({ data: mockData });
      expect(result).toEqual(mockReturn);
    });
  });




  describe('atualizarFotoPerfil', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    it('atualiza a foto do perfil corretamente', async () => {
      const id_utilizador = 5;
      const caminhoImagem = 'imagens/foto5.png';
  
      const perfilExistente = {
        id_perfil: 10,
        id_utilizador,
        foto_perfil: 'antiga.png',
      };
  
      const perfilAtualizado = {
        ...perfilExistente,
        foto_perfil: caminhoImagem,
      };
  
      mockFindFirst.mockResolvedValue(perfilExistente);
      mockUpdate.mockResolvedValue(perfilAtualizado);
  
      const result = await atualizarFotoPerfil(id_utilizador, caminhoImagem);
  
      expect(mockFindFirst).toHaveBeenCalledWith({
        where: { id_utilizador },
      });
  
      expect(mockUpdate).toHaveBeenCalledWith({
        where: { id_perfil: perfilExistente.id_perfil },
        data: { foto_perfil: caminhoImagem },
      });
  
      expect(result).toEqual(perfilAtualizado);
    });
  
    it('lança erro se o perfil não for encontrado', async () => {
      const id_utilizador = 99; // outro ID
      const caminhoImagem = 'imagens/foto99.png';
  
      mockFindFirst.mockResolvedValue(null); // simular que não encontrou
  
      await expect(atualizarFotoPerfil(id_utilizador, caminhoImagem))
        .rejects
        .toThrow('Perfil não encontrado');
  
      expect(mockFindFirst).toHaveBeenCalledWith({
        where: { id_utilizador },
      });
  
      expect(mockUpdate).not.toHaveBeenCalled();
    });
  });