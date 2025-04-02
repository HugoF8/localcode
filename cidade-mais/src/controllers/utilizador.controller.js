const utilizadorService = require('../services/utilizador.service');

// Criar utilizadores
async function createUtilizador(req, res) {
    try {
        const utilizador = await utilizadorService.createUtilizador(req.body);
        res.status(201).json(utilizador);
    } catch (error) {
        console.error("Erro ao criar utilizador:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar utilizador", detalhes: error.message });
    }
}

// Buscar todos os utilizadores
async function getAllUtilizadores(req, res) {
    try {
        const utilizadores = await utilizadorService.getAllUtilizadores();
        res.json(utilizadores);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao buscar utilizador' });
    }
}

module.exports = { createUtilizador, getAllUtilizadores };
