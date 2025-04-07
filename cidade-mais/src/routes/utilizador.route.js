const express = require('express');
const utilizadorController = require('../controllers/utilizador.controller');
const autenticacao = require('../middlewares/autent.middleware');


const router = express.Router();

router.post('/criarUtilizador', utilizadorController.createUtilizador);
router.get('/verUtilizadores', autenticacao, utilizadorController.getAllUtilizadores);


module.exports = router;