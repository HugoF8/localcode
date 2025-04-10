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

module.exports = { createTicket, getAllTickets, getTicketPendente };
