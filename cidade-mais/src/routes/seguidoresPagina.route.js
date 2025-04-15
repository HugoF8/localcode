const express = require('express');
const seguidoresController = require('../controllers/seguidoresPagina.controller');

const router = express.Router();
const { authenticate } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarSeguidor', seguidoresController.createUSeguidor);
router.get('/verSeguidor', seguidoresController.getAllUSeguidores);
router.get('/verPaginasSeguidas/:id_utilizador', seguidoresController.getPaginasSeguidas);


module.exports = router;
