const { PrismaClient } = require('@prisma/client');
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
            estado_ticket:'pendente',
  }
    })
}

async function getTicketFechado(id_utilizador) {
    return prisma.ticket.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_ticket:'Fechado',
  }
    })
}

async function getTicketAberto(id_utilizador) {
    return prisma.ticket.findMany({ 
        where:{
            id_utilizador:id_utilizador,
            estado_ticket:'Aberto',
  }
    })
}


async function atualizarEstadoTicket(id_ticket, bol,) {


    const novoEstado = bol ? "fechado" : "aberto";

    const ticketAtualizado = await prisma.ticket.update({
        where: { id_ticket },
        data: {
            estado_ticket: novoEstado,
        },
        })   

    
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

module.exports = { createTicket, getAllTickets, getTicketPendente,getTicketAberto, getTicketFechado, atualizarEstadoTicket, alterarTicket };
