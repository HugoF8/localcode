const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar morada
async function createMorada(data) {
    return await prisma.morada.create({ data });
}

// Buscar todos os morada
async function getAllMorada() {
    return prisma.morada.findMany();
}

module.exports = { createMorada, getAllMorada };
