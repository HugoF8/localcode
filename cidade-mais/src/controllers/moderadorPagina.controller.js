const moderadorPaginaService = require('../services/moderadorPagina.service');

// Cria um novo moderador de página
async function createModeradorPagina(req, res) {
    try {
        const moderadorPagina = await moderadorPaginaService.createModeradorPagina(req.body);
        res.status(201).json(moderadorPagina);
    } catch (error) {
        console.error('Erro ao criar Moderador de Página:', error);
        res.status(500).json({ error: 'Erro ao criar Moderador de Página', detalhes: error.message });
    }
}

// Busca todos os moderadores de página
async function getAllModeradorPagina(req, res) {
    try {
        const moderadores = await moderadorPaginaService.getAllModeradorPagina();
        res.json(moderadores);
    } catch (error) {
        console.error('Erro ao buscar Moderadores de Página:', error);
        res.status(500).json({ error: 'Erro ao procurar Moderadores de Página' });
    }
}

module.exports = { createModeradorPagina, getAllModeradorPagina };
