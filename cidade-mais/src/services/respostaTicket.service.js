const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar resposta
async function createResposta(data) {
    return prisma.resposta_ticket.create({ data });
}

// Buscar todas as respostas
async function getAllRespostas() {
    return prisma.resposta_ticket.findMany();
}

module.exports = { createResposta, getAllRespostas };
