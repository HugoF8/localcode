const notificacaoService = require('../services/notificacao.service');

async function createNotificacao(req, res) {
    try {
        const notificacao = await notificacaoService.createNotificacao(req.body);
        res.status(201).json(notificacao);
    } catch (error) {
        console.error("Erro ao criar notificacao:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar notificacao", detalhes: error.message });
    }
}

async function getAllNotificacao(req, res) {
    try {
        const notificacao = await notificacaoService.getAllNotificacao();
        res.json(notificacao);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar notificacaos' });
    }    
}

async function getNotificacaoPorUtilizador(req, res) {

    const { id_utilizador } = req.params;

    if (!id_utilizador) {
        return res.status(400).json({ mensagem: "Parâmetro 'id_utilizador' é obrigatório." });
    }

    try {
        const notificacao = await notificacaoService.getNotificacaoPorUtilizador(id_utilizador);
        res.json(notificacao);
    } catch (error) {
        console.error("Erro ao buscar notificações por utilizador:", error);
        res.status(500).json({
            error: "Erro ao buscar notificações por utilizador",
            detalhes: error.message
        });
    }
}

module.exports = { createNotificacao, getAllNotificacao, getNotificacaoPorUtilizador };