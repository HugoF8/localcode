const utilizadorService = require('../services/utilizador.service');

// Criar usuário
async function createUtilizador(req, res) {
    try {
        //const utilizador = await utilizadorService.createUtilizador(req.body);
        //res.status(201).json(utilizador);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar utilizador' });
    }
}

// Buscar todos os usuários
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
