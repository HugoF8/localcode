const paginaFregusiaService = require('../services/paginaFreguesia.service');

async function createPaginaFreguesia(req, res) {
    try {
        const pagina = await paginaFregusiaService.createPaginaFreguesia(req.body);
        res.status(201).json(pagina);
    } catch (error) {
        console.error("Erro ao criar pagina:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar pagina", detalhes: error.message });
    }
}

async function getAllPaginaFreguesia(req, res) {
    try {
        const paginas = await paginaFregusiaService.getAllPaginaFreguesia();
        res.json(paginas);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar paginas' });
    }
}

module.exports = { createPaginaFreguesia, getAllPaginaFreguesia };