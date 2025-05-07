const pedidoPaginaService = require('../services/pedidoPagina.service');

async function createPedidoPagina(req, res) {
    try {
      const id_utilizador = req.utilizador?.utilizadorId;
  
      // Verifica se o comprovativo foi enviado
      if (!req.file) {
        return res.status(400).json({ error: 'Comprovativo não enviado' });
      }
  
      // Cria o objeto com todos os dados
      const dadosCompletos = {
        ...req.body,
        id_utilizador,
        dados_comprovacao: req.file.filename, // Apenas o nome do ficheiro
      };
  
      const pedido = await pedidoPaginaService.createPedidoPagina(dadosCompletos);
      res.status(201).json(pedido);
    } catch (error) {
      console.error("Erro ao criar Pedido Pagina:", error);
      res.status(500).json({ error: "Erro ao criar Pedido Pagina", detalhes: error.message });
    }
  }

async function getAllPedidoPagina(req, res) {
  try {
    const pedidos = await pedidoPaginaService.getAllPedidoPagina();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas' });
  }
}

async function getPedidoPendente(req, res) {
  try {
    const pedidos = await pedidoPaginaService.getPedidoPendente();
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Pendentes' });
  }
}

async function getPedidoAprovado(req, res) {
  const id_utilizador = req.utilizador?.utilizadorId;
  if (!id_utilizador) {
    return res.status(401).json({ error: 'Utilizador não autenticado ou ID inválido' });
  }
  try {
    const pedidos = await pedidoPaginaService.getPedidoAprovado(id_utilizador);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Aprovadas' });
  }
}

async function getPedidoReprovado(req, res) {
  const id_utilizador = req.utilizador?.utilizadorId;
  if (!id_utilizador) {
    return res.status(401).json({ error: 'Utilizador não autenticado ou ID inválido' });
  }
  try {
    const pedidos = await pedidoPaginaService.getPedidoReprovado(id_utilizador);
    res.json(pedidos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao procurar Pedidos de Paginas Reprovadas' });
  }
}

async function atualizarEstadoPedido(req, res) {
  try {
    const idPedido = Number(req.params.id_pedido);
    if (isNaN(idPedido)) {
      return res.status(400).json({ error: 'id_pedido deve ser um número válido' });
    }
    const { bol } = req.body;
    const pedido = await pedidoPaginaService.atualizarEstadoPedido(idPedido, bol);
    res.json(pedido);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao atualizar estado do pedido' });
  }
}

async function alterarPedidoPagina(req, res) {
  // Extrai o nome do novo ficheiro
  const ficheiro = req.file?.filename;
  if (!ficheiro) {
    return res.status(400).json({ error: "Comprovativo não enviado" });
  }

  const idPedido = Number(req.params.id_pedido);
  if (isNaN(idPedido)) {
    return res.status(400).json({ error: 'id_pedido inválido' });
  }

  try {
    const pedidoAlterado = await pedidoPaginaService.alterarPedidoPagina(idPedido, ficheiro);
    res.status(200).json({
      mensagem: "Dados de comprovação do pedido alterados com sucesso.",
      pedido: pedidoAlterado,
    });
  } catch (error) {
    console.error("Erro ao atualizar dados de comprovação:", error);
    res.status(500).json({ error: 'Erro ao atualizar o pedido', detalhes: error.message });
  }
}

module.exports = {
  createPedidoPagina,
  getAllPedidoPagina,
  getPedidoPendente,
  getPedidoAprovado,
  getPedidoReprovado,
  atualizarEstadoPedido,
  alterarPedidoPagina,
};