const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar perfil
async function createPerfil(data) {
    return prisma.perfil.create({ data });
}

// Buscar todos os Perfis
async function getAllPerfil() {
    return prisma.perfil.findMany();
}

module.exports = { createPerfil, getAllPerfil };
