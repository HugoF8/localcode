const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Notificacao
async function createNotificacao(data) {
    // Extrai só os possíveis IDs relacionais
    const {
      id_utilizador,
      id_post,
      id_ticket,
      id_pagina,
      tipo_notificacao,
      conteudo_notificacao,
      estado_notificacao,
      data: dataNotificacao
    } = data;
  
    const createData = {
      tipo_notificacao,
      ...(conteudo_notificacao && { conteudo_notificacao }),
      ...(estado_notificacao && { estado_notificacao }),
      ...(dataNotificacao && { data: dataNotificacao })
    };
  
    if (id_utilizador) {
      createData.utilizador = { connect: { id_utilizador } };
    }
    if (id_post) {
      createData.post = { connect: { id_post } };
    }
    if (id_ticket) {
      createData.ticket = { connect: { id_ticket } };
    }
    if (id_pagina) {
      createData.pagina_freguesia = { connect: { id_pagina } };
    }
  
    return prisma.notificacao.create({ data: createData });
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
