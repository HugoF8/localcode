const seguidoresService = require('../services/seguidoresPagina.service');
const postService = require("../services/post.service");

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

async function getPaginasSeguidas(req, res) {

    const { id_utilizador} = req.params;
    const idUtilizador = Number(id_utilizador);

    if (isNaN(idUtilizador)) {
        return res.status(400).json({ error: 'id de utilizador deve ser um número válido' });
    }

    try {
        const pagina = await seguidoresService.getPaginasSeguidas(idUtilizador);
        res.json(pagina);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

module.exports = { createUSeguidor, getAllUSeguidores, getPaginasSeguidas};
