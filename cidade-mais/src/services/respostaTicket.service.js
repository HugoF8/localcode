const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const prisma = new PrismaClient();

// Criar resposta
async function createResposta(data) {

    const novaResposta = await prisma.resposta_ticket.create({ data });
    const notificacao = novaResposta.estado_resposta === 'resolvido' ? tipo_notificacao.Sucesso : tipo_notificacao.Insucesso
    
    await createNotificacao({
        id_utilizador: novaResposta.id_utilizador,
        id_ticket: novaResposta.id_ticket,
        tipo_notificacao: notificacao
    });

    await prisma.ticket.update({ // repetição de codigo melhorar isto
        where: { id_ticket: novaResposta.id_ticket },
        data: {
            estado_ticket: 'fechado',
        },})   

    return novaResposta
}

// Buscar todas as respostas
async function getAllRespostas() {
    return prisma.resposta_ticket.findMany();
}

async function getRespostasPorUtilizador(id_utilizador) {
    return prisma.resposta_ticket.findMany({
        where: {
            id_utilizador: id_utilizador,
        }
    });
}

module.exports = { createResposta, getAllRespostas, getRespostasPorUtilizador };
