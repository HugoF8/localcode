const postService = require('../services/post.service');

// Criar Post
async function createPost(req, res) {
  try {
    const { id_utilizador, id_pagina, descricao_post } = req.body;
    const media_post = req.file ? req.file.path : null;

    // Validações
    if (!id_utilizador || isNaN(Number(id_utilizador))) {
      return res.status(400).json({ error: "O ID de utilizador é obrigatório e deve ser numérico." });
    }

    if (!id_pagina || isNaN(Number(id_pagina))) {
      return res.status(400).json({ error: "O ID de página é obrigatório e deve ser numérico." });
    }

    if (!descricao_post && !media_post) {
      return res.status(400).json({ error: "Descrição ou imagem são obrigatórios." });
    }

    const post = await postService.createPost({
      id_utilizador: Number(id_utilizador),
      id_pagina: Number(id_pagina),
      descricao_post,
      media_post,
    });

    return res.status(201).json(post);
  } catch (err) {
    console.error("Erro ao criar post:", err);
    return res.status(500).json({ error: "Erro ao criar post", detalhes: err.message });
  }
}

// Listar todos os posts (admin)
async function getAllPosts(req, res) {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Erro ao buscar posts:", error);
    res.status(500).json({ error: "Erro ao buscar publicações", detalhes: error.message });
  }
}

// Listar posts pendentes (moderador)
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

// Aprovar/Recusar posts (moderador)
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

// Listar posts de uma página ou o feed
async function getPostPagina(req, res) {
  const { id_pagina: qp } = req.query;

  if (!qp) {
    try {
      const feed = await postService.getPostsPaginasSeguidas(req.utilizador.utilizadorId);
      return res.status(200).json(feed);
    } catch (error) {
      console.error("Erro ao buscar feed:", error);
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

// Listar posts aprovados do utilizador
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

// Listar posts recusados do utilizador
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

// Alterar informações de um post (proprietário)
async function alterarInformacoesPost(req, res) {
  try {
    const id_post = Number(req.params.id_post);

    if (isNaN(id_post)) {
      return res.status(400).json({ error: 'id_post inválido' });
    }

    const { descricao_post } = req.body;
    const updateData = { descricao_post };

    if (req.file) {
      updateData.media_post = 'uploads/' + req.file.filename;
    }

    const updatedPost = await postService.alterarInformacoesPost(id_post, descricao_post, media_post);


    if (!updatedPost) {
      return res.status(404).json({ error: 'Post não encontrado' });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar post', detalhes: error.message });
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
