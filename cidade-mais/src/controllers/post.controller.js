const postService = require('../services/post.service');

// Criar Post
async function createPost(req, res) {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (error) {
        console.error("Erro ao criar :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao criar publicação", detalhes: error.message });
    }
}

// Buscar todos os Posts
async function getAllPosts(req, res) {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

module.exports = { createPost, getAllPosts };
