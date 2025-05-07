const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const prisma = new PrismaClient();

// Criar ticket
async function createTicket(data) {
    return prisma.ticket.create({ data });
}

// Buscar todos os tickets
async function getAllTickets() {
    return prisma.ticket.findMany();
}

async function getTicketPendente(id_pagina) {
    return prisma.ticket.findMany({ 
        where:{
            id_pagina: id_pagina,
            estado_ticket:'pendente'},
            include: {
                utilizador: {
                  select: {
                    nome: true,
                    perfil: {
                      select: {
                        foto_perfil: true,
                      },
                    },
                },
            },
        },
    });
}

async function getTicketFechado(id_utilizador) {
    return prisma.ticket.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_ticket:'fechado',
        }
    })
}

async function getTicketAberto(id_utilizador) {
    return prisma.ticket.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_ticket:'aberto',
        }
    })
}


async function atualizarEstadoTicket(id_ticket, bol,) {


    const novoEstado = bol ? "aberto" : "fechado";
    const notificacao = bol ? tipo_notificacao.Aprovado : tipo_notificacao.Recusado;
    
    const ticketAtualizado = await prisma.ticket.update({
        where: { id_ticket },
        data: {
            estado_ticket: novoEstado,
        },
        })   
    
    const ticketAtual = await prisma.ticket.findUnique({where:{id_ticket}}) //simplificar isto ir buscar só o id_utilizador
    await createNotificacao({id_utilizador: ticketAtual.id_utilizador, id_ticket: id_ticket,tipo_notificacao: notificacao})
    return ticketAtualizado

}

async function alterarTicket(id_ticket, descricao_problema) {
    const ticketAlterado = await prisma.ticket.update({
        where: { id_ticket },
        data: {
            descricao_problema: descricao_problema
        },
    });

    return ticketAlterado;
}

async function deleteTicket(id_ticket) {
    return prisma.ticket.delete({ where: { id_ticket } });
  }

module.exports = { createTicket, getAllTickets, getTicketPendente,getTicketAberto, getTicketFechado, atualizarEstadoTicket, alterarTicket, deleteTicket };
