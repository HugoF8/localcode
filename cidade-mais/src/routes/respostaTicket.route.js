const express = require('express');
const respostaController = require('../controllers/respostaTicket.controller');

const router = express.Router();

router.post('/criarResposta', respostaController.createResposta);
router.get('/verRespostas', respostaController.getAllRespostas);

module.exports = router;
