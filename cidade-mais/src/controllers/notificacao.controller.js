const notificacaoService = require('../services/notificacao.service');

async function createNotificacao(req, res) {
    try {
        const notificacao = await notificacaoService.createNotificacao(req.body);
        res.status(201).json(notificacao);
      } catch (error) {
        if (error.statusCode === 400) {
          return res.status(400).json({ error: error.message });
        }
        console.error("Erro ao criar notificacao:", error);
        res.status(500).json({ error: "Erro ao criar notificacao" });
      }
    }

async function getAllNotificacao(req, res) {
    try {
        const notificacao = await notificacaoService.getAllNotificacao();
        res.json(notificacao);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar notificacaos' });
    }    
}

async function marcarTodasComoLidas(req, res) {
  const id = Number(req.params.id_utilizador);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }
  try {
    await notificacaoService.marcarNotificacoesComoLidas(id);
    res.json({ mensagem: 'Notificações marcadas como lidas.' });
  } catch (error) {
    console.error('Erro ao marcar notificações como lidas:', error);
    res.status(500).json({ error: 'Erro ao atualizar notificações.' });
  }
}

async function contarNaoLidas(req, res) {
  const id = Number(req.params.id_utilizador);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido.' });
  }
  try {
    const total = await notificacaoService.contarNotificacoesNaoLidas(id);
    res.json({ totalNaoLidas: total });
  } catch (error) {
    console.error('Erro ao contar notificações:', error);
    res.status(500).json({ error: 'Erro ao contar notificações.' });
  }
}

async function getNotificacaoPorUtilizador(req, res) {

    const idParam = req.params.id_utilizador;
    const id_utilizador = Number(idParam);

    if (isNaN(id_utilizador)) {
        return res.status(400).json({ mensagem: "Parâmetro 'id_utilizador' inválido." });
    }

    try {
        const notificacoes = await notificacaoService.getNotificacaoPorUtilizador(id_utilizador);
        return res.json(notificacoes);
    } catch (error) {
        console.error("Erro ao buscar notificações por utilizador:", error);
        return res.status(500).json({
            error: "Erro ao buscar notificações por utilizador",
            detalhes: error.message
        });
    }
}


module.exports = { createNotificacao, getAllNotificacao, marcarTodasComoLidas, contarNaoLidas, getNotificacaoPorUtilizador };