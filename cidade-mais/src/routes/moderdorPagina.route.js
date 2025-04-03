const express = require('express');
const utilizadorController = require('../controllers/moderadorPagina.controller');

const router = express.Router();

router.post('/criarModeradorPagina', moderadorPaginaController.createModeradorPagina);
router.get('/verModeradorPagina', moderadorPaginaController.getAllModeradorPagina);

module.exports = router;
