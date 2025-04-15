const express = require('express');
const utilizadorController = require('../controllers/utilizador.controller');
const {authenticate} = require('../middlewares/autent.middleware');


const router = express.Router();

router.post('/criarUtilizador', utilizadorController.createUtilizador);
router.get('/verUtilizadores', authenticate, utilizadorController.getAllUtilizadores);
router.patch('/alterarUtilizadores', utilizadorController.alterarTipoUtilizadores);

module.exports = router;