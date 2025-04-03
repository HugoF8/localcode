const express = require('express');
const comentarioController = require('../controllers/comentario.controller');

const router = express.Router();

router.post('/criarComentario', comentarioController.createComentario);
router.get('/verComentarios', comentarioController.getAllComentario);

module.exports = router;