const express = require('express');
const notificacaoController = require('../controllers/notificacao.controller');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarNotificacao', notificacaoController.createNotificacao);
router.get('/verNotificacao', notificacaoController.getAllNotificacao);
router.patch('/marcarComoLidas/:id_utilizador', notificacaoController.marcarTodasComoLidas);
router.get('/contarNaoLidas/:id_utilizador', notificacaoController.contarNaoLidas);
router.get('/verNotificacaoPorUtilizador/:id_utilizador', notificacaoController.getNotificacaoPorUtilizador);

module.exports = router;
