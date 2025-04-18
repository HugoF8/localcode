
const mockFindUnique = jest.fn();
const mockCreate = jest.fn()
const mockUpdate = jest.fn();
const mockCreateNotificacao = jest.fn();

const mockTipoNotificacao = {
    Aprovado: 'Aprovado',
    Recusado: 'Recusado',
    Validacao: 'Validacao', 
    Verificacao: 'Verificacao',
    Sucesso: 'Sucesso',
    Insucesso: 'Insucesso'
};
const mockEstadoPost = {
    ativo: "ativo",
    inativo:"inativo",
    pendente:"pendente"
};

  jest.mock('@prisma/client', () => {
    return {
      PrismaClient: jest.fn().mockImplementation(() => ({
        post: {
            create: mockCreate,
            findUnique: mockFindUnique,
            update: mockUpdate,
        },
        notificacao: {
          create: mockCreateNotificacao,
        },
      })),
      estado_post:mockEstadoPost,
      tipo_notificacao: mockTipoNotificacao
    };
  });

  const { createPost, getPostPagina, getPostsAprovados,getPostsRecusados,atualizarEstadoPost, alterarInformacoesPost } = require('../../src/services/post.service');

  describe('createPost', () => {
    it('criar Post com os dados corretos e obter o resultado esperado', async () => {
        const mockData = {
            id_utilizador: 1,
            id_pagina: 2,
            descricao_post: "teste",
          };

        const mockReturn = {id_post: 1, ...mockData}

       
        mockCreate.mockResolvedValue(mockReturn);
        mockCreateNotificacao.mockResolvedValue({});

        const result = await createPost(mockData);

        expect(mockCreate).toHaveBeenCalledWith({data: mockData});
            expect(mockCreateNotificacao).toHaveBeenCalledWith({
              data: {  // Assuming the create method expects a data object
                id_utilizador:mockData.id_utilizador,
                id_post: result.id_post,
                tipo_notificacao: mockTipoNotificacao.Validacao  // Usa o enum correto
              }
            });
        
            expect(result).toEqual(mockReturn);
        
    })
})
