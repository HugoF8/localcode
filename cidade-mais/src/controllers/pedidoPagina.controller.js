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

async function getPedidoPendente(req, res) {
    try {
        const pedidoPagina = await pedidoPaginaService.getPedidoPendente();
        res.json(pedidoPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Pendentes' });
    }
}

async function getPedidoAprovado(req, res) {
    try {
        const pedidoPagina = await pedidoPaginaService.getPedidoAprovado(id_utilizador);
        res.json(pedidoPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Aprovadas' });
    }
}

async function getPedidoReprovado(req, res) {
    try {
        const pedidoPagina = await pedidoPaginaService.getPedidoReprovado(id_utilizador);
        res.json(pedidoPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Reprovadas' });
    }
}

async function atualizarEstadoPedido(req, res) {
    try {
        // Extrai o id_pedido da URL (que vem como string)
        const { id_pedido } = req.params;

        // Converte id_pedido para número
        const idPedidoNumber = Number(id_pedido);

        // Verifica se a conversão foi bem-sucedida
        if (isNaN(idPedidoNumber)) {
            return res.status(400).json({ error: 'id_pedido deve ser um número válido' });
        }

        const { bol } = req.body;  // Pega os dados do corpo da requisição

        // Chama o serviço para atualizar o estado do pedido
        const pedidoPagina = await pedidoPaginaService.atualizarEstadoPedido(idPedidoNumber, bol);
        res.json(pedidoPagina);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao atualizar estado do pedido' });
    }
}

async function alterarPedidoPagina(req, res) {
    const { id_pedido } = req.params;
    const idPedido = Number(id_pedido);
    const { dados_comprovacao } = req.body;

    if (!dados_comprovacao) {
        return res.status(400).json({ mensagem: "O campo 'dados_comprovacao' é obrigatório." });
    }

    try {
        const pedidoAlterado = await alterarPedidoPagina(idPedido, dados_comprovacao );

        return res.status(200).json({
            mensagem: "Dados de comprovação do pedido alterados com sucesso.",
            pedido: pedidoAlterado,
        });
    } catch (error) {
        console.error("Erro ao atualizar os dados de comprovação do pedido:", error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar o pedido.",
            erro: error.message,
        });
    }
}

module.exports = { createPedidoPagina, getAllPedidoPagina, getPedidoPendente, getPedidoAprovado, getPedidoReprovado, atualizarEstadoPedido, alterarPedidoPagina };