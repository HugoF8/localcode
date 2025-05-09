const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const prisma = new PrismaClient();

// Criar resposta
async function createResposta(data) {
    try {
      const novaResposta = await prisma.resposta_ticket.create({ data });
  
      const notificacao = novaResposta.estado_resposta === 'resolvido'
        ? tipo_notificacao.Sucesso
        : tipo_notificacao.Insucesso;
  
      await createNotificacao({
        id_utilizador: novaResposta.id_utilizador,
        id_ticket: novaResposta.id_ticket,
        tipo_notificacao: notificacao
      });
  
      await prisma.ticket.update({
        where: { id_ticket: novaResposta.id_ticket },
        data: { estado_ticket: 'fechado' },
      });
  
      return novaResposta;
  
    } catch (error) {
      console.error('Erro ao criar resposta:', error);
      throw new Error('Erro interno ao criar resposta');
    }
  }

// Buscar todas as respostas
async function getAllRespostas() {
    return prisma.resposta_ticket.findMany();
}

async function getRespostasPorUtilizador(id_utilizador, id_ticket) {
    return prisma.resposta_ticket.findMany({
        where: {
            id_utilizador: id_utilizador,
            id_ticket: id_ticket
        },
        orderBy: {
            data_post: 'desc',
        }
    });
}

module.exports = { createResposta, getAllRespostas, getRespostasPorUtilizador };
