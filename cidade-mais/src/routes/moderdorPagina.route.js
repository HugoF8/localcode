const express = require('express');
const moderadorPaginaController = require('../controllers/moderadorPagina.controller');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
const {authModerador} = require('../middlewares/verificacoes.middleware');
router.use(authenticate);

router.post('/criarModeradorPagina',authModerador, moderadorPaginaController.createModeradorPagina);
//router.get('/verModeradorPagina', moderadorPaginaController.getAllModeradorPagina);
router.get('/verPaginasModeradas', moderadorPaginaController.verPaginasModeradas);
router.delete('/removerModeradorPagina', moderadorPaginaController.deleteModeradorPagina);

module.exports = router;
    