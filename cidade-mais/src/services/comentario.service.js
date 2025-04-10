const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar comentario
async function createComentario(data) {
    return prisma.comentario.create({ data });
}

// Buscar todos os comentario
async function getAllComentario() {
    return prisma.comentario.findMany();
}

async function getComentarioPost(id_post) {
    return prisma.comentario.findMany({ 
        where:{
            id_post: id_post,
        }
    })
}

module.exports = { createComentario, getAllComentario, getComentarioPost };
