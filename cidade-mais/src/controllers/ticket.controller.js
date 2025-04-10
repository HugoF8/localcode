const ticketService = require('../services/ticket.service');

// Criar tickets
async function createTicket(req, res) {
    try {
        const ticket = await ticketService.createTicket(req.body);
        res.status(201).json(ticket);
    } catch (error) {
        console.error("Erro ao criar ticket:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar ticket", detalhes: error.message });
    }
}

// Buscar todos os tickets
async function getAllTickets(req, res) {
    try {
        const tickets = await ticketService.getAllTickets();
        res.json(tickets);
    } catch (error) {
        console.error("Erro ao buscar tickets:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar tickets", detalhes: error.message });
    }
}

// Buscar todos os tickets pendentes
async function getTicketPendente(req, res) {
    try {
        const tickets = await ticketService.getTicketPendente();
        res.json(tickets);
    } catch (error) {
        console.error("Erro ao buscar tickets pendentes:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar tickets pendentes", detalhes: error.message });
    }
}

async function atualizarEstadoTicket(req, res) {
    try {
        const tickets = await ticketService.atualizarEstadoTicket();
        res.json(tickets);
    } catch (error) {
        console.error("Erro ao buscar tickets pendentes:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar tickets pendentes", detalhes: error.message });
    }
}


module.exports = { createTicket, getAllTickets, getTicketPendente, atualizarEstadoTicket };
