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

module.exports = { createComentario, getAllComentario };
