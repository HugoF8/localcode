const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar paginaFreguesia
async function createPaginaFreguesia(data) {
    return prisma.paginaFreguesia.create({ data });
}

// Buscar todos os paginaFreguesia
async function getAllPaginaFreguesia() {
    return prisma.paginaFreguesia.findMany();
}

module.exports = { createPaginaFreguesia, getAllPaginaFreguesia };
