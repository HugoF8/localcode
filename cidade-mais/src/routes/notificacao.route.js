const express = require('express');
const notificacaoController = require('../controllers/notificacao.controller');

const router = express.Router();

router.post('/criarNotificacao', notificacaoController.createNotificacao);
router.get('/verNotificacao', notificacaoController.getAllNotificacao);

module.exports = router;
