const express = require('express');
const respostaController = require('../controllers/respostaTicket.controller');

const router = express.Router();

const { authenticate} = require('../middlewares/autent.middleware');
const { authProprietario, authModerador } = require('../middlewares/verificacoes.middleware');


router.use(authenticate);

router.post('/criarResposta', authModerador, respostaController.createResposta);
router.get('/verRespostas',authProprietario ,respostaController.getAllRespostas);
router.get('/verRespostas/:id_utilizador', respostaController.getRespostasPorUtilizador);

module.exports = router;
