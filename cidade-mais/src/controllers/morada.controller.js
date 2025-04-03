const moradaService = require('../services/morada.service');

async function createMorada(req, res) {
    try {
        const morada = await moradaService.createMorada(req.body);
        res.status(201).json(morada);
    } catch (error) {
        console.error("Erro ao criar morada:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar morada", detalhes: error.message });
    }
}

async function getAllMorada(req, res) {
    try {
        const morada = await moradaService.getAllMorada();
        res.json(morada);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar moradas' });
    }
}

module.exports = { createMorada, getAllMorada };