const perfilService = require('../services/perfil.service');

// Criar perfil
async function createPerfil(req, res) {
    try {
        const perfil = await perfilService.createPerfil(req.body);
        res.status(201).json(perfil);
    } catch (error) {
        console.error("Erro ao criar perfil:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar perfil", detalhes: error.message });
    }
}

// Buscar todos os perfis
async function getAllPerfil(req, res) {
    try {
        const perfil = await perfilService.getAllPerfil();
        res.json(perfil);
    } catch (error) {
        console.error("Erro ao buscar perfil:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar perfil", detalhes: error.message });
    }
}

async function atualizarFotoPerfil(req, res) {
    try {
        const userId = req.utilizador.utilizadorId; // <- este está certo
        const imagePath = req.file.path;

        const perfilAtualizado = await perfilService.atualizarFotoPerfil(userId, imagePath);
        res.status(200).json(perfilAtualizado);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
module.exports = { createPerfil, getAllPerfil, atualizarFotoPerfil };
