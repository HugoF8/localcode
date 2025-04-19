
const mockFindUnique = jest.fn();
const mockFind = jest.fn()
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
            findMany: mockFind
        },
        notificacao: {
          create: mockCreateNotificacao,
        },
      })),
      estado_post:mockEstadoPost,
      tipo_notificacao: mockTipoNotificacao
    };
  });


const { estado_notificacao, estado_post } = require('@prisma/client');
  const { createPost, getPostPagina, getPostsAprovados,getPostsRecusados,atualizarEstadoPost, alterarInformacoesPost, getPostPendente } = require('../../src/services/post.service');

  describe('createPost', () => {
    it('criar Post com os dados corretos e obter o resultado esperado', async () => {
        const mockData = {
            id_utilizador: 1,
            id_pagina: 2,
            descricao_post: "teste",
          };

        const mockReturn = {id_post: 1, ...mockData}

        mockCreate.mockResolvedValue(mockReturn)
        mockCreateNotificacao.mockResolvedValue({});

        const result = await createPost(mockData);

        expect(mockCreate).toHaveBeenCalledWith({data: mockData});

        expect(mockCreateNotificacao).toHaveBeenCalledWith({
          data: {  // Assuming the create method expects a data object
            id_utilizador: mockData.id_utilizador,
            id_post: result.id_post,
            tipo_notificacao: mockTipoNotificacao.Validacao  // Usa o enum correto
          }
        });
        
        expect(result).toEqual(mockReturn);
        
    })
  });

    describe('getPostPendente', () => {
      it('get dos posts com os dados corretos e obter o resultado esperado', async () => {
        const id_pagina = 42
        const mockReturn = [
          { id_post: 1, id_utilizador:11, id_pagina:42, descricao_post:"Teste", aprovacoes:2},
          { id_post: 2, id_utilizador:12, id_pagina:42, descricao_post:"Teste2", aprovacoes:4 },
        ];

        mockFind.mockResolvedValue([mockReturn[0]]);;
        const result = await getPostPendente(id_pagina);
        
        expect(mockFind).toHaveBeenCalledWith({
          where: {
            id_pagina:42,
            estado_post: mockEstadoPost.pendente,
            aprovacoes:{lt:4},
          },
        });
        expect(result).toContainEqual(mockReturn[0]);
        expect(result).not.toContainEqual(mockReturn[1]);
      })   
    });

    describe('getPostPagina', () => {
      it('get dos posts com os dados corretos e obter o resultado esperado', async () => {
        const id_pagina = 42
        const mockReturn = [
          { id_post: 1, id_utilizador:11, id_pagina:42, descricao_post:"Teste", aprovacoes:2},
          { id_post: 2, id_utilizador:12, id_pagina:43, descricao_post:"Teste2", aprovacoes:4 },
        ];

        mockFind.mockResolvedValue([mockReturn[0]]);;
        const result = await getPostPagina(id_pagina);
        
        expect(mockFind).toHaveBeenCalledWith({
          where: {
            id_pagina:42,
          },
        });
        expect(result).toContainEqual(mockReturn[0]);
        expect(result).not.toContainEqual(mockReturn[1]);
      })   
    });

    describe('getPostAprovados', () => {
      it('get dos posts com os dados corretos e obter o resultado esperado', async () => {
        const id_utilizador = 11
        const mockReturn = [
          { id_post: 1, id_utilizador:11, id_pagina:42, descricao_post:"Teste", aprovacoes:2,estado_post: mockEstadoPost.ativo },
          { id_post: 3, id_utilizador:11, id_pagina:42, descricao_post:"Teste3", aprovacoes:2,estado_post: mockEstadoPost.inativo },
          { id_post: 2, id_utilizador:12, id_pagina:43, descricao_post:"Teste2", aprovacoes:4, estado_post: mockEstadoPost.ativo },
        ];

        mockFind.mockResolvedValue([mockReturn[0]]);;
        const result = await getPostsAprovados(id_utilizador);
        
        expect(mockFind).toHaveBeenCalledWith({
          where: {
            id_utilizador: id_utilizador,
            estado_post: estado_post.ativo
          },
        });
        expect(result).toContainEqual(mockReturn[0]);
        expect(result).not.toContainEqual(mockReturn[2]);
        expect(result).not.toContainEqual(mockReturn[1]);
      })   
    });

    describe('getPostRecusados', () => {
      it('get dos posts com os dados corretos e obter o resultado esperado', async () => {
        const id_utilizador = 11
        const mockReturn = [
          { id_post: 1, id_utilizador:11, id_pagina:42, descricao_post:"Teste", aprovacoes:2,estado_post: mockEstadoPost.ativo },
          { id_post: 3, id_utilizador:11, id_pagina:42, descricao_post:"Teste3", aprovacoes:2,estado_post: mockEstadoPost.inativo },
          { id_post: 2, id_utilizador:12, id_pagina:43, descricao_post:"Teste2", aprovacoes:4, estado_post: mockEstadoPost.ativo },
        ];

        mockFind.mockResolvedValue([mockReturn[1]]);
        const result = await getPostsRecusados(id_utilizador);
        
        expect(mockFind).toHaveBeenCalledWith({
          where: {
            id_utilizador: id_utilizador,
            estado_post: estado_post.inativo
          },
        });
        expect(result).toContainEqual(mockReturn[1]);
        expect(result).not.toContainEqual(mockReturn[2]);
        expect(result).not.toContainEqual(mockReturn[0]);
      })   
    });



//#############################//



    describe('atualizarEstadoPost', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });
    
      it('incrementa aprovações e envia notificação de verificação (primeira aprovação)', async () => {
        const id_post = 1;
        const bolean = true;
    
        const postAtual = {
          id_post,
          id_utilizador: 10,
          estado_post: 'pendente',
          aprovacoes: 0,
        };
    
        const postAtualizado = {
          ...postAtual,
          aprovacoes: 1,
          estado_post: 'pendente',
        };
    
        mockFindUnique.mockResolvedValue(postAtual);
        mockUpdate.mockResolvedValue(postAtualizado);
        mockCreateNotificacao.mockResolvedValue({});
    
        const result = await atualizarEstadoPost(bolean, id_post);
    
        expect(mockFindUnique).toHaveBeenCalledWith({ where: { id_post } });
        expect(mockUpdate).toHaveBeenCalledWith({
          where: { id_post },
          data: {
            aprovacoes: 1,
            estado_post: mockEstadoPost.pendente,
          },
        });
        expect(mockCreateNotificacao).toHaveBeenCalledWith({
          data: {
            id_utilizador: postAtual.id_utilizador,
            id_post: postAtual.id_post,
            tipo_notificacao: mockTipoNotificacao.Verificacao,
          }
        });
    
        expect(result).toEqual(postAtualizado);
      });
    
      it('altera o estado para "ativo" na terceira aprovação e envia notificação de aprovação', async () => {
        const id_post = 2;
        const bolean = true;
    
        const postAtual = {
          id_post,
          id_utilizador: 20,
          estado_post: 'pendente',
          aprovacoes: 2,
        };
    
        const postAtualizado = {
          ...postAtual,
          aprovacoes: 3,
          estado_post: 'ativo',
        };
    
        mockFindUnique.mockResolvedValue(postAtual);
        mockUpdate.mockResolvedValue(postAtualizado);
        mockCreateNotificacao.mockResolvedValue({});
    
        const result = await atualizarEstadoPost(bolean, id_post);
    
        expect(mockUpdate).toHaveBeenCalledWith({
          where: { id_post },
          data: {
            aprovacoes: 3,
            estado_post: 'ativo',
          },
        });
    
        expect(mockCreateNotificacao).toHaveBeenCalledWith({
          data: {
            id_utilizador: postAtual.id_utilizador,
            id_post: postAtual.id_post,
            tipo_notificacao: mockTipoNotificacao.Aprovado,
          }
        });
    
        expect(result).toEqual(postAtualizado);
      });
    
      it('altera o estado para "inativo" se for recusado e envia notificação de recusa', async () => {
        const id_post = 3;
        const bolean = false;
    
        const postAtual = {
          id_post,
          id_utilizador: 30,
          estado_post: 'pendente',
          aprovacoes: 1,
        };
    
        const postAtualizado = {
          ...postAtual,
          estado_post: 'inativo',
        };
    
        mockFindUnique.mockResolvedValue(postAtual);
        mockUpdate.mockResolvedValue(postAtualizado);
        mockCreateNotificacao.mockResolvedValue({});
    
        const result = await atualizarEstadoPost(bolean, id_post);
    
        expect(mockUpdate).toHaveBeenCalledWith({
          where: { id_post },
          data: {
            aprovacoes: 1,
            estado_post: mockEstadoPost.inativo,
          },
        });
    
        expect(mockCreateNotificacao).toHaveBeenCalledWith({
          data: {
            id_utilizador: postAtual.id_utilizador,
            id_post: postAtual.id_post,
            tipo_notificacao: mockTipoNotificacao.Recusado,
          }
        });
    
        expect(result).toEqual(postAtualizado);
      });
    });
