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

async function getPostPendente(id_pagina) {
    return prisma.post.findMany({ 
        where:{
            id_pagina: id_pagina,
            aprovacoes:{lt:4}//lt=less than
        }
    })
}

// Buscar todos os Posts
async function getAllPosts() {
    return prisma.post.findMany();
}

module.exports = { createPost, getAllPosts, atualizarEstadoPost, getPostPendente};
