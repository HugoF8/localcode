const express = require('express');
const moderadorPaginaController = require('../controllers/moderadorPagina.controller');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarModeradorPagina', moderadorPaginaController.createModeradorPagina);
//router.get('/verModeradorPagina', moderadorPaginaController.getAllModeradorPagina);
router.get('/verPaginasModeradas/:id_utilizador?', moderadorPaginaController.verPaginasModeradas);
router.delete('/removerModeradorPagina/:id_pagina/:id_utilizador', moderadorPaginaController.deleteModeradorPagina);

module.exports = router;
    