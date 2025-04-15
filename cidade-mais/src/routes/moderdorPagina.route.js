const express = require('express');
const moderadorPaginaController = require('../controllers/moderadorPagina.controller');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarModeradorPagina', moderadorPaginaController.createModeradorPagina);
router.get('/verModeradorPagina', moderadorPaginaController.getAllModeradorPagina);

module.exports = router;
