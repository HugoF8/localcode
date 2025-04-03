const express = require('express');
const moderadorPaginaController = require('../controllers/moderadorPagina.controller');

const router = express.Router();

router.post('/criarModeradorPagina', moderadorPaginaController.createModeradorPagina);
router.get('/verModeradorPagina', moderadorPaginaController.getAllModeradorPagina);

module.exports = router;
