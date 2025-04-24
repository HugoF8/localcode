const postService = require('../services/post.service');

// Criar Post
async function createPost(req, res) {
  try {
    const post = await postService.createPost(req.body);
    res.status(201).json(post);
  } catch (error) {
    console.error("Erro ao criar post:", error);
    res.status(500).json({ error: "Erro ao criar publicação", detalhes: error.message });
  }
}

// Listar todos (admin)
async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ error: "Erro ao buscar publicações", detalhes: error.message });
  }
}

// Listar pendentes (moderador)
async function getPostsPendente(req, res) {
  const id_pagina = Number(req.params.id_pagina);
  if (isNaN(id_pagina)) {
    return res.status(400).json({ error: 'id_pagina deve ser um número válido' });
  }
  try {
    const posts = await postService.getPostPendente(id_pagina);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts pendentes:", error);
    res.status(500).json({ error: "Erro ao buscar publicações pendentes", detalhes: error.message });
  }
}

// Aprovar/recusar (moderador)
async function atualizarEstadoPost(req, res) {
  const id_post = Number(req.params.id_post);
  if (isNaN(id_post)) {
    return res.status(400).json({ error: 'id_post deve ser um número válido' });
  }
  const { bolean } = req.body;
  try {
    const atualizado = await postService.atualizarEstadoPost(bolean, id_post);
    res.status(200).json(atualizado);
  } catch (error) {
    console.error("Erro ao atualizar post:", error);
    res.status(500).json({ error: 'Erro ao atualizar o post.', detalhes: error.message });
  }
}

// Listar posts de uma página (seguindo ou não)
async function getPostPagina(req, res) {
  const { id_pagina: qp } = req.query;

  // se não veio query, devolve o feed (páginas seguidas)
  if (!qp) {
    try {
      const feed = await postService.getPostsPaginasSeguidas(req.utilizador.utilizadorId);
      return res.status(200).json(feed);
    } catch (error) {
      console.error("Erro ao buscar feed no lugar de posts de página:", error);
      return res.status(500).json({ error: "Erro ao buscar feed", detalhes: error.message });
    }
  }

  const id_pagina = Number(qp);
  if (isNaN(id_pagina)) {
    return res.status(400).json({ error: 'id_pagina deve ser um número válido na query string' });
  }

  try {
    const posts = await postService.getPostPagina(id_pagina);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts de página:", error);
    res.status(500).json({ error: "Erro ao buscar publicações da página", detalhes: error.message });
  }
}

// Listar aprovados do próprio usuário
async function getPostsAprovados(req, res) {
  const id_utilizador = req.utilizador.utilizadorId;
  try {
    const posts = await postService.getPostsAprovados(id_utilizador);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts aprovados:", error);
    res.status(500).json({ error: "Erro ao buscar publicações aprovadas", detalhes: error.message });
  }
}

// Listar recusados do próprio usuário
async function getPostsRecusados(req, res) {
  const id_utilizador = req.utilizador.utilizadorId;
  try {
    const posts = await postService.getPostsRecusados(id_utilizador);
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts recusados:", error);
    res.status(500).json({ error: "Erro ao buscar publicações recusadas", detalhes: error.message });
  }
}

// Alterar infos (proprietário)
async function alterarInformacoesPost(req, res) {
  const id_post = Number(req.params.id_post);
  if (isNaN(id_post)) {
    return res.status(400).json({ error: 'id_post deve ser um número válido' });
  }
  const { descricao_post, media_post } = req.body;
  try {
    const alterado = await postService.alterarInformacoesPost(id_post, descricao_post, media_post);
    res.status(200).json(alterado);
  } catch (error) {
    console.error("Erro ao alterar post:", error);
    res.status(500).json({ error: "Erro ao alterar publicação", detalhes: error.message });
  }
}

// Feed de páginas seguidas
async function getPostsPaginasSeguidas(req, res) {
  const id_utilizador = req.utilizador.utilizadorId;
  try {
    const feed = await postService.getPostsPaginasSeguidas(id_utilizador);
    res.status(200).json(feed);
  } catch (error) {
    console.error("Erro ao buscar feed:", error);
    res.status(500).json({ error: "Erro ao buscar feed", detalhes: error.message });
  }
}

module.exports = {createPost,getAllPosts,getPostsPendente,atualizarEstadoPost,getPostPagina,getPostsAprovados,getPostsRecusados,alterarInformacoesPost,getPostsPaginasSeguidas};
