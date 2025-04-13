const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar post
async function createPost(data) {
    return prisma.post.create({ data });
}

async function atualizarEstadoPost(bolean,id_post) {
    
    const postAtual = await prisma.post.findUnique({where:{id_post}})

    let aprovacoes= postAtual.aprovacoes ?? 0
    let estadoatualizado = postAtual.estado_post

    if(bolean == true && aprovacoes < 3){
        aprovacoes += 1
        if(aprovacoes == 3){
            estadoatualizado = 'ativo'
        }
    }
    else {estadoatualizado = 'inativo'}

    const postAtualizado = await prisma.post.update({
        where: { id_post },
        data: {
          aprovacoes: aprovacoes,
          estado_post: estadoatualizado,
        },
        })
      
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


module.exports = { createPost, getAllPosts, atualizarEstadoPost, getPostPendente, getPostPagina, getPostsAprovados, getPostsRecusados, alterarInformacoesPost};
