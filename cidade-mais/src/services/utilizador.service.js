const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar utilizador
async function createUtilizador(data) {
    return prisma.utilizador.create({ data });
}

// Buscar todos os utilizador
async function getAllUtilizadores() {
    return prisma.utilizador.findMany();
}

module.exports = { createUtilizador, getAllUtilizadores };
