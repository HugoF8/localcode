const seguidoresService = require('../services/seguidoresPagina.service');
const postService = require("../services/post.service");

// Criar seguidores
async function createSeguidor(req, res) {
    const id_utilizador = req.utilizador?.utilizadorId;

    if (!id_utilizador) {
        return res.status(401).json({ error: 'Utilizador não autenticado ou ID inválido' });
    }

    const dadosSeguidor = {
        id_utilizador: id_utilizador,
        id_pagina: req.body.id_pagina,  
    };

    try {
        const novoSeguidor = await seguidoresService.createSeguidor(dadosSeguidor);
        res.status(201).json(novoSeguidor);
    } catch (error) {
        console.error("Erro ao criar seguidor:", error);
        res.status(500).json({ error: "Erro ao criar seguidor", detalhes: error.message });
    }
}

// Buscar todos os seguidores
async function getAllSeguidores(req, res) {
    try {
        const seguidores = await seguidoresService.getAllSeguidores();
        res.json(seguidores);
    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
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
        console.error("Erro na busca :", error);
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

async function pararSeguir(req, res) {
    const { id_utilizador, id_pagina } = req.body;

    try {
        const removerSeguidor = await seguidoresService.pararSeguir(id_utilizador, id_pagina);
        console.log("Seguidor removido:", removerSeguidor);
        res.status(200).json({ mensagem: "Seguidor removido com sucesso" });
    } catch (error) {
        console.error("Erro ao parar de seguir:", error);
        res.status(500).json({ error: "Erro ao parar de seguir", detalhes: error.message });
    }
}
module.exports = { createSeguidor, getAllSeguidores, getPaginasSeguidas, pararSeguir};
