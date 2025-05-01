const express = require('express');
const seguidoresController = require('../controllers/seguidoresPagina.controller');

const router = express.Router();

const { authenticate } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarSeguidor', seguidoresController.createSeguidor);
router.get('/verSeguidor', seguidoresController.getAllSeguidores);
router.get('/verPaginasSeguidas/:id_utilizador', seguidoresController.getPaginasSeguidas);
router.delete('/removerSeguidor', seguidoresController.pararSeguir);


module.exports = router;
