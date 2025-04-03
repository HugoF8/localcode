const moderadorPaginaService = require('../services/moderadorPagina.service');

async function createModeradorPagina(req, res) {
    try {
        const moderadorPagina = await moderadorPaginaService.createModeradorPagina(req.body);
        res.status(201).json(moderadorPagina);
    } catch (error) {
        console.error("Erro ao criar Moderador de Pagina:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar Moderador de Pagina", detalhes: error.message });
    }
}

async function getAllModeradorPagina(req, res) {
    try {
        const moderadorPagina = await moderadorPagina.getAllModeradorPagina();
        res.json(moderadorPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar Moderadores de Pagina' });
    }
}