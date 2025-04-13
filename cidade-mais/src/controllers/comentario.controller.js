const comentarioService = require('../services/comentario.service');

async function createComentario(req, res) {
    try {
        const comentario = await comentarioService.createComentario(req.body);
        res.status(201).json(comentario);
    } catch (error) {
        console.error("Erro ao criar comentario:", error); // Mostra o erro real no terminal
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
        return res.status(400).json({ error: 'id POst deve ser um número válido' });
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