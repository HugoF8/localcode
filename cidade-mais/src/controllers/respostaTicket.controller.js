const respostaService = require('../services/respostaTicket.service');

// Criar Resposta
async function createResposta(req, res) {
    try {
        const resposta = await respostaService.createResposta(req.body);
        res.status(201).json(resposta);
    } catch (error) {
        console.error("Erro ao criar resposta para o ticket:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar resposta para o ticket ", detalhes: error.message });
    }
}

// Buscar todas as respostas
async function getAllRespostas(req, res) {
    try {
        const respostas = await respostaService.getAllRespostas();
        res.json(respostas);
    } catch (error) {
        console.error("Erro ao buscar respostas para o ticket:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar respostas para o ticket", detalhes: error.message });
    }
}

module.exports = { createResposta, getAllRespostas };
