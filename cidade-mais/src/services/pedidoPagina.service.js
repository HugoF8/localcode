const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar pedidoPagina
async function createPedidoPagina(data) {
    return prisma.pedidoPagina.create({ data });
}

// Buscar todos os pedidoPagina
async function getAllPedidoPagina() {
    return prisma.pedidoPagina.findMany();
}

module.exports = { createPedidoPagina, getAllPedidoPagina };
