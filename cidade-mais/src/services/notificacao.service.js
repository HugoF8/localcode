const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Notificacao
async function createNotificacao(data) {
    return prisma.notificacao.create({ data });
}

// Buscar todos os Notificacao
async function getAllNotificacao() {
    return prisma.notificacao.findMany();
}

module.exports = { createNotificacao, getAllNotificacao };
