const perfilService = require('../services/perfil.service');

// Criar perfil
async function createPerfil(req, res) {
    try {
        const perfil = await perfilService.createPerfil(req.body);
        res.status(201).json(perfil);
    } catch (error) {
        console.error("Erro ao criar perfil:", error);
        res.status(500).json({ error: "Erro ao criar perfil", detalhes: error.message });
    }
}

// Buscar todos os perfis
async function getAllPerfil(req, res) {
    try {
        const perfil = await perfilService.getAllPerfil();
        res.json(perfil);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error); 
        res.status(500).json({ error: "Erro ao buscar perfil", detalhes: error.message });
    }
}

async function atualizarFotoPerfil(req, res) {
    try {
        const userId = req.utilizador.utilizadorId;

        console.log('ID do utilizador para atualizar foto:', userId);

        if (!req.file) {
            return res.status(400).json({ error: 'Nenhuma imagem foi enviada.' });
        }

        const imagePath = req.file.path;

        const perfilAtualizado = await perfilService.atualizarFotoPerfil(userId, imagePath);
        res.status(200).json(perfilAtualizado);
    } catch (err) {
        console.error("Erro ao atualizar a foto do perfil:", err);
        res.status(500).json({ error: 'Erro interno ao atualizar a foto', detalhes: err.message });
    }
}


module.exports = { createPerfil, getAllPerfil, atualizarFotoPerfil };
