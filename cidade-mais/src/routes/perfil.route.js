const express = require('express');
const perfilController = require('../controllers/perfil.controller');

const router = express.Router();

router.post('/criarPerfil', perfilController.createPerfil);
router.get('/verPerfil', perfilController.getAllPerfil);

module.exports = router;
