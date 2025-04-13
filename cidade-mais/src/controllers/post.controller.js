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

async function getPostsPendente(req, res) {

    const id_pagina = parseInt(req.params.id_pagina) // ou req.query.id_pagina

    try {
        const posts = await postService.getPostPendente(id_pagina)
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

//-----------------------------
async function atualizarEstadoPost(req, res) {
    const {id_post} = req.params
    const idPost = Number(id_post)
    const { bolean } = req.body

    if (isNaN(idPost)) {
        return res.status(400).json({ error: 'idPost deve ser um número válido' });
    }
  
    try {
      const postAtualizado = await postService.atualizarEstadoPost(bolean, idPost)
      res.json(postAtualizado)
    } catch (error) {
      console.error("Erro ao atualizar post:", error)
      res.status(500).json({ error: 'Erro ao atualizar o post.', detalhes: error.message })
    }
  }

  async function getPostPagina(req, res) {

    try {
        const posts = await postService.getPostPagina(id_pagina)
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

async function getPostsAprovados(req, res) {

    try {
        const posts = await postService.getPostsAprovados(id_utilizador)
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

async function getPostsRecusados(req, res) {

    try {
        const posts = await postService.getPostsRecusados(id_utilizador)
        res.json(posts);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

async function alterarInformacoesPost(req, res) {

    const {id_post} = req.params
    const idPost = Number(id_post)
    const {descricao_post, media_post} = req.body

    if (isNaN(idPost)) {
        return res.status(400).json({ error: 'idPost deve ser um número válido' });
    }

    try {
        const postAlterado = await postService.alterarInformacoesPost(idPost, descricao_post, media_post);
        res.json(postAlterado);
    } catch (error) {
        console.error("Erro na busca :", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar publicação", detalhes: error.message });
    }
}

async function getPostsPaginasSeguidas(req, res) {
    const id_utilizador = req.user?.id || req.query.id_utilizador;

    try {
        const posts = await postService.getPostsPaginasSeguidas(id_utilizador);
        res.json(posts);
    } catch (error) {
        console.error("Erro ao buscar feed:", error);
        res.status(500).json({ error: "Erro ao buscar feed", detalhes: error.message });
    }
}

module.exports = { createPost, getAllPosts, getPostsPendente, atualizarEstadoPost, getPostPagina, getPostsAprovados, getPostsRecusados, alterarInformacoesPost, getPostsPaginasSeguidas};
