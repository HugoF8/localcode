const express = require('express');
const comentarioController = require('../controllers/comentario.controller');

const router = express.Router();

const { authSeguir } = require('../middlewares/verificacoes.middleware');
const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarComentario',authSeguir, comentarioController.createComentario);
router.get('/verComentarios', comentarioController.getAllComentario);//apagar ou por admin
router.get('/verComentariosPost/:id_post',authSeguir, comentarioController.getComentarioPost);

module.exports = router;