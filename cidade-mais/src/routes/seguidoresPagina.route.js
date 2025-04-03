const express = require('express');
const seguidoresController = require('../controllers/seguidoresPagina.controller');

const router = express.Router();

router.post('/criarSeguidor', seguidoresController.createUSeguidor);
router.get('/verSeguidor', seguidoresController.getAllUSeguidores);

module.exports = router;
