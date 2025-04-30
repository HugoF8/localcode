const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const prisma = new PrismaClient();

// Criar post
async function createPost(data) {
    // 1. Cria o post primeiro
    const novoPost = await prisma.post.create({ data });

    // 2. Cria a notificação usando dados do post criado
    await createNotificacao({
        id_utilizador: novoPost.id_utilizador,
        id_post: novoPost.id_post,
        tipo_notificacao: tipo_notificacao.Validacao
    });

    return novoPost;
    
}

async function atualizarEstadoPost(bolean,id_post) {
    
    const postAtual = await prisma.post.findUnique({where:{id_post}})

    let aprovacoes= postAtual.aprovacoes ?? 0
    let estadoatualizado = postAtual.estado_post

    if(bolean === true && aprovacoes < 3){
        aprovacoes += 1

        if (aprovacoes === 1){
            notificacao = tipo_notificacao.Verificacao
        }
        else if(aprovacoes === 3){
            estadoatualizado = 'ativo'
            notificacao = tipo_notificacao.Aprovado
        }
    }
    else if (bolean === false) {
        estadoatualizado = 'inativo'
        notificacao = tipo_notificacao.Recusado
    }

    const postAtualizado = await prisma.post.update({
        where: { id_post },
        data: {
          aprovacoes: aprovacoes,
          estado_post: estadoatualizado,
        },
        })
     if(notificacao) {await createNotificacao({id_utilizador: postAtual.id_utilizador, id_post: postAtual.id_post,tipo_notificacao: notificacao})}
        notificacao = null
      return postAtualizado 
}

// Buscar todos os Posts
async function getAllPosts() {
    return prisma.post.findMany();
}

async function getPostPendente(id_pagina) {
    return prisma.post.findMany({ 
        where:{
            id_pagina: id_pagina,
            estado_post:'pendente',
            aprovacoes:{lt:4}//lt=less than
        }
    })
}

async function getPostPagina(id_pagina) {
    return prisma.post.findMany({ 
        where:{
            id_pagina: id_pagina,
        }
    })
}

async function getPostsAprovados(id_utilizador) {
    return prisma.post.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_post: 'ativo'
        }
    })
}

async function getPostsRecusados(id_utilizador) {
    return prisma.post.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_post: 'inativo'
        }
    })
}

async function alterarInformacoesPost(idPost, descricao_post, media_post) {

    const postAlterado = await prisma.post.update({
        where: { id_post: idPost },
        data: {
            descricao_post: descricao_post,
            media_post: media_post
        },
        })  

        return postAlterado
}

async function getPostsPaginasSeguidas(id_utilizador) {
    try {
        // Buscar IDs das páginas seguidas pelo utilizador
        const paginasSeguidas = await prisma.seguidores_pagina.findMany({
            where: {
                id_utilizador: id_utilizador,
            },
            select: {
                id_pagina: true,
            },
        });

        const idsPaginas = paginasSeguidas.map(p => p.id_pagina);

        if (idsPaginas.length === 0) return [];

        // Buscar posts dessas páginas com estado "ativo"
        const posts = await prisma.post.findMany({
            where: {
                id_pagina: {
                    in: idsPaginas,
                },
                estado_post: 'ativo',
            },
            include: {
                utilizador: {
                    select: {
                        nome: true,
                        foto_perfil: true,
                    }
                },
                pagina_freguesia: {
                    select: {
                        nome_pagina: true,
                        foto_perfil: true,
                    }
                },
            },
            orderBy: {
                data_post: 'desc',
            },
        });

        return posts;

    } catch (error) {
        throw new Error('Erro ao buscar posts das páginas seguidas: ' + error.message);
    }
}



module.exports = { createPost, getAllPosts, atualizarEstadoPost, getPostPendente, getPostPagina, getPostsAprovados, getPostsRecusados, alterarInformacoesPost, getPostsPaginasSeguidas};
