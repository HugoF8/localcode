const express = require('express');
const postController = require('../controllers/post.controller');
const upload = require('../config/multerConfig');
const router = express.Router();

const { authSeguir, authProprietario, authModerador } = require('../middlewares/verificacoes.middleware');
const { authenticate, authRole } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarPost', authSeguir, upload.single('media_post'),  postController.createPost);
router.get('/verPosts', postController.getAllPosts); //admin
router.get('/verPostsPendentes/:id_pagina', authModerador, postController.getPostsPendente);
router.patch('/atualizarPostsPendentes/:id_post', authModerador, postController.atualizarEstadoPost);
router.get('/verPostsPagina/:id_pagina', /*authSeguir,*/postController.getPostPagina);
router.get('/verPostsAprovados', postController.getPostsAprovados);
router.get('/verPostsRecusados',authProprietario, postController.getPostsRecusados);
router.patch('/alterarInformacoesPost/:id_post', authProprietario, upload.single('media_post'), postController.alterarInformacoesPost);
router.get('/verPostsPaginasSeguidas/:id_utilizador', postController.getPostsPaginasSeguidas);


module.exports = router;
