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

async function atualizarEstadoTicket(id_ticket, bol,) {

  
    const novoEstado = bol ? "fechado" : "aberto";

    const ticketAtualizado = await prisma.ticket.update({
        where: { id_ticket },
        data: {
            estado_pedido: novoEstado,
        },
        })   

    
    return ticketAtualizado
    
}

module.exports = { createTicket, getAllTickets, getTicketPendente, atualizarEstadoTicket };
