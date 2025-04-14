const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar resposta
async function createResposta(data) {

    const novaResposta = await prisma.resposta_ticket.create({ data });
    notificacao = novaResposta.estado_resposta == 'resolvido' ? tipo_notificacao.Sucesso : tipo_notificacao.Insucesso
    // 2. Cria a notificação usando dados do post criado
    await createNotificacao({
        id_utilizador: novaResposta.id_utilizador,
        id_ticket: novaResposta.id_ticket,
        tipo_notificacao: notificacao
    });

    return prisma.resposta_ticket.create({ data });
}

// Buscar todas as respostas
async function getAllRespostas() {
    return prisma.resposta_ticket.findMany();
}

module.exports = { createResposta, getAllRespostas };
