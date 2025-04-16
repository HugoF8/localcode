const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

const { authSeguir } = require('../middlewares/verificacoes.middleware');
const { authenticate, authRole } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarPost', authSeguir, postController.createPost);
router.get('/verPosts', postController.getAllPosts);
router.get('/verPostsPendentes/:id_pagina', authRole('moderador'), postController.getPostsPendente);
router.patch('/atualizarPostsPendentes/:id_post', authRole('moderador'), postController.atualizarEstadoPost);
router.get('/verPostsPagina', /*authSeguir,*/postController.getPostPagina);
router.get('/verPostsAprovados', postController.getPostsAprovados);
router.get('/verPostsRecusados', postController.getPostsRecusados);
router.patch('/alterarInformacoesPost/:id_post', postController.alterarInformacoesPost);
router.get('/verPostsPaginasSeguidas/:id_utilizador', postController.getPostsPaginasSeguidas);

module.exports = router;
