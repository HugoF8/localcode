const seguidoresService = require('../services/seguidoresPagina.sevice');

// Criar seguidores
async function createUSeguidor(req, res) {
    try {
        const seguidor = await seguidoresService.createUSeguidor(req.body);
        res.status(201).json(seguidor);
    } catch (error) {
        console.error("Erro ao criar seguidor:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar seguidor", detalhes: error.message });
    }
}

// Buscar todos os seguidores
async function getAllUSeguidores(req, res) {
    try {
        const seguidores = await seguidoresService.getAllUSeguidores();
        res.json(seguidores);
    } catch (error) {
        console.error("Erro ao buscar seguidores:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar seguidores", detalhes: error.message });
    }
}

module.exports = { createUSeguidor, getAllUSeguidores };
