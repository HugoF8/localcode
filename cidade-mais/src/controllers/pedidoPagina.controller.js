const pedidoPaginaService = require('../services/pedidoPagina.service');

async function createPedidoPagina(req, res) {
    try {
        const pedidoPagina = await pedidoPaginaService.createPedidoPagina(req.body);
        res.status(201).json(pedidoPagina);
    } catch (error) {
        console.error("Erro ao criar Pedido Pagina:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar Pedido Pagina", detalhes: error.message });
    }
}

async function getAllPedidoPagina(req, res) {
    try {
        const pedidoPagina = await pedidoPaginaService.getAllPedidoPagina();
        res.json(pedidoPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas' });
    }
}

module.exports = { createPedidoPagina, getAllPedidoPagina };