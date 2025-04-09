const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/criarPost', postController.createPost);
router.get('/verPosts', postController.getAllPosts);
router.get('/PostsPendentes', postController.getAllPostsPendentes);
router.patch('/PostsPendentes', postController.atualizarEstadoPostController);
module.exports = router;
