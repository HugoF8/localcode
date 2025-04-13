const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/criarPost', postController.createPost);
router.get('/verPosts', postController.getAllPosts);
router.get('/PostsPendentes', postController.getAllPostsPendente);
router.patch('/PostsPendentes/:id_post', postController.atualizarEstadoPost);
module.exports = router;
