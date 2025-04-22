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

async function getNotificacaoPorUtilizador(id_utilizador) {
    return prisma.notificacao.findMany({
        where: {
            id_utilizador: id_utilizador,
        }
    });
}

module.exports = { createNotificacao, getAllNotificacao, getNotificacaoPorUtilizador };
