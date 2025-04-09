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

async function getAllPostsPendentes(req, res) {

    const id_pagina = parseInt(req.params.id_pagina) // ou req.query.id_pagina

    try {
        const posts = await postService.getAllPostsPendentes(id_pagina)
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

//-----------------------------
async function atualizarEstadoPostController(req, res) {
    const id_post = parseInt(req.params.id)
    const { bolean } = req.body
  
    try {
      const postAtualizado = await postService.atualizarEstadoPost(bolean, id_post)
      res.json(postAtualizado)
    } catch (error) {
      console.error("Erro ao atualizar post:", error)
      res.status(500).json({ error: 'Erro ao atualizar o post.', detalhes: error.message })
    }
  }

module.exports = { createPost, getAllPosts, getAllPostsPendentes, atualizarEstadoPostController};
