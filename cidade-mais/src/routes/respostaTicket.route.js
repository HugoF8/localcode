const express = require('express');
const respostaController = require('../controllers/respostaTicket.controller');

const router = express.Router();

const { authenticate, authRole } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarResposta', authRole('moderador'), respostaController.createResposta);
router.get('/verRespostas', respostaController.getAllRespostas);
router.get('/verRespostas/:id_utilizador', respostaController.getRespostasPorUtilizador);

module.exports = router;
