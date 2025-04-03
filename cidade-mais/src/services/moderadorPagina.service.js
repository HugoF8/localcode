const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar moderadorPagina
async function createModeradorPagina(data) {
    return prisma.moderadorPagina.create({ data });
}

// Buscar todos os moderadorPagina
async function getAllModeradorPagina() {
    return prisma.moderadorPagina.findMany();
}

module.exports = { createModeradorPagina, getAllModeradorPagina };
