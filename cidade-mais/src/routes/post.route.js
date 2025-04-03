const express = require('express');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/criarPost', postController.createPost);
router.get('/verPosts', postController.getAllPosts);

module.exports = router;
