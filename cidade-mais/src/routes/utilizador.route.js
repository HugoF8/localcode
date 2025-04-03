const express = require('express');
const utilizadorController = require('../controllers/utilizador.controller');

const router = express.Router();

router.post('/criarUtilizador', utilizadorController.createUtilizador);
router.get('/verUtilizadores', utilizadorController.getAllUtilizadores);

module.exports = router;