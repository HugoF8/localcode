
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Seguidor
async function createUSeguidor(data) {
    return prisma.seguidores_pagina.create({ data });
}

// Buscar todos os seguidores
async function getAllUSeguidores() {
    return prisma.seguidores_pagina.findMany();
}

module.exports = { createUSeguidor, getAllUSeguidores };
