const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar moderadorPagina
async function createModeradorPagina(data) {
    return prisma.moderador_pagina.create({ data });
}

// Buscar todos os moderadorPagina
async function getAllModeradorPagina() {
    return prisma.moderador_pagina.findMany();
}

module.exports = { createModeradorPagina, getAllModeradorPagina };
