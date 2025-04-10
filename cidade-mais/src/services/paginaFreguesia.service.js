const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar paginaFreguesia
async function createPaginaFreguesia(data) {
    return prisma.pagina_freguesia.create({ data });
}

// Buscar todos os paginaFreguesia
async function getAllPaginaFreguesia() {
    return prisma.pagina_freguesia.findMany();
}

module.exports = { createPaginaFreguesia, getAllPaginaFreguesia };