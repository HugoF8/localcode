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

async function getPerfilUtilizador(req, res) {
  try {
    const userId = Number(req.params.id_utilizador); // extrair o ID 
    const perfil = await perfilService.getPerfilUtilizador(userId);
    if (!perfil) return res.status(404).json({ error: 'Perfil não encontrado' });
    res.json(perfil);
  } catch (err) {
    console.error('Erro ao obter perfil:', err);
    res.status(500).json({ error: 'Erro interno ao obter perfil' });
  }
}
async function atualizarFotoPerfil(req, res) {
  try {
    const userId = req.utilizador.utilizadorId;
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhuma imagem válida foi enviada.' });
    }

    const imagePath = req.file.path;
    const perfilAtualizado = await perfilService.atualizarFotoPerfil(userId, imagePath);

    res.status(200).json(perfilAtualizado);
  } catch (err) {
    console.error("Erro ao atualizar a foto do perfil:", err);
    res.status(500).json({ error: 'Erro interno ao atualizar a foto', detalhes: err.message });
  }
}



module.exports = { createPerfil, getAllPerfil, getPerfilUtilizador,atualizarFotoPerfil };
