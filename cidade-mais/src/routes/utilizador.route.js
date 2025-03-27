const express = require('express');
const utilizadorController = require('../controllers/utilizador.controller');

const router = express.Router();

router.post('/', utilizadorController.createUtilizador);
router.get('/ola', utilizadorController.getAllUtilizadores);

module.exports = router;
