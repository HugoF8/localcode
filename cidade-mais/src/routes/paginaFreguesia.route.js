const express = require('express');
const paginaFreguesiaController = require('../controllers/paginaFreguesia.controller');

const router = express.Router();

router.post('/criarPaginaFreguesia', paginaFreguesiaController.createPaginaFreguesia);
router.get('/verPaginaFreguesia', paginaFreguesiaController.getAllPaginaFreguesia);
router.get('/pesquisarPaginas', paginaFreguesiaController.pesquisaPagina);

module.exports = router;
