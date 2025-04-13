const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/criarPost', postController.createPost);
router.get('/verPosts', postController.getAllPosts);
router.get('/verTodosPostsPendentes', postController.getAllPostsPendente);
router.patch('/atualizarPostsPendentes/:id_post', postController.atualizarEstadoPost);
router.get('/verPostsPagina', postController.getPostPagina);
router.get('/verPostsAprovados', postController.getPostsAprovados);
router.get('/verPostsRecusados', postController.getPostsRecusados);
router.patch('/alterarInformacoesPost/:id_post', postController.alterarInformacoesPost);

module.exports = router;
