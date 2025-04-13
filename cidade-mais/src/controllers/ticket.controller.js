const ticketService = require('../services/ticket.service');
const pedidoPaginaService = require("../services/pedidoPagina.service");

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

async function getTicketAberto(req, res) {
    try {
        const tickets = await ticketService.getTicketAberto();
        res.json(tickets);
    } catch (error) {
        console.error("Erro ao buscar tickets abertos:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar tickets abertos", detalhes: error.message });
    }
}

async function getTicketFechado(req, res) {
    try {
        const tickets = await ticketService.getTicketFechado();
        res.json(tickets);
    } catch (error) {
        console.error("Erro ao buscar tickets fechados:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar tickets fechados", detalhes: error.message });
    }
}

async function atualizarEstadoTicket(req, res) {
    try {
        // Extrai o id_ticket da URL (que vem como string)
        const { id_ticket } = req.params;

        // Converte id_ticket para número
        const idTicketNumber = Number(id_ticket);

        // Verifica se a conversão foi bem-sucedida
        if (isNaN(idTicketNumber)) {
            return res.status(400).json({ error: 'id_ticket deve ser um número válido' });
        }

        const { bol } = req.body;  // Pega os dados do corpo da requisição

        // Chama o serviço para atualizar o estado do ticket
        const ticket = await ticketService.atualizarEstadoTicket(idTicketNumber, bol);
        res.json(ticket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao atualizar estado do ticket' });
    }
}

async function alterarTicket(req, res) {
    const { id } = req.params;
    const id_ticket = Number(id_ticket)
    const { descricao_problema } = req.body;

    if (!descricao_problema) {
        return res.status(400).json({ mensagem: "O campo 'descricao_problema' é obrigatório." });
    }

    try {
        const ticketAlterado = await alterarTicket(parseInt(id), descricao_problema);

        return res.status(200).json({
            mensagem: "Descrição do ticket alterada com sucesso.",
            ticket: ticketAlterado,
        });
    } catch (error) {
        console.error("Erro ao alterar a descrição do ticket:", error);

        return res.status(500).json({
            mensagem: "Erro ao alterar o ticket.",
            erro: error.message,
        });
    }
}


module.exports = { createTicket, getAllTickets, getTicketPendente, getTicketAberto, getTicketFechado,atualizarEstadoTicket, alterarTicket};
