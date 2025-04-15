const express = require('express');
const comentarioController = require('../controllers/comentario.controller');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarComentario', comentarioController.createComentario);
router.get('/verComentarios', comentarioController.getAllComentario);
router.get('/verComentariosPost/:id_post', comentarioController.getComentarioPost);

module.exports = router;