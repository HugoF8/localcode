const comentarioService = require('../services/comentario.service');

async function createComentario(req, res) {
    const { id_post, id_utilizador, conteudo_comentario } = req.body;
  
    if (!conteudo_comentario || conteudo_comentario.trim().length === 0) {
      return res.status(400).json({ error: 'Comentário não pode estar vazio.' });
    }
  
    try {
      const comentario = await comentarioService.createComentario({ id_post, id_utilizador, conteudo_comentario });
      res.status(201).json(comentario);
    } catch (error) {
      console.error("Erro ao criar comentario:", error);
      res.status(500).json({ error: "Erro ao criar comentario", detalhes: error.message });
    }
  }

async function getAllComentario(req, res) {
    try {
        const comentario = await comentarioService.getAllComentario();
        res.json(comentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar comentarios' });
    }
}

async function getComentarioPost(req, res) {

    const { id_post} = req.params;
    const idPost = Number(id_post);

    if (isNaN(idPost)) {
        return res.status(400).json({ error: 'id Post deve ser um número válido' });
    }

    try {
        const comentario = await comentarioService.getComentarioPost(idPost);
        res.json(comentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Erro ao procurar comentarios' });
    }
}

module.exports = { createComentario, getAllComentario, getComentarioPost };