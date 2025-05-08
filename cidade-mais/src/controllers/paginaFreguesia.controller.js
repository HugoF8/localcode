const paginaFreguesiaService = require('../services/paginaFreguesia.service');

async function createPaginaFreguesia(req, res) {
  const { nome_pagina, id_morada, id_utilizador } = req.body;

  if (!nome_pagina || nome_pagina.trim() === "") {
    return res.status(400).json({ error: "O nome da página é obrigatório" });
  }

  try {
    const pagina = await paginaFreguesiaService.createPaginaFreguesia(req.body);
    res.status(201).json(pagina);
  } catch (error) {
    console.error("Erro ao criar página:", error);
    res.status(500).json({ error: "Erro ao criar página", detalhes: error.message });
  }
}

async function getAllPaginaFreguesia(req, res) {
  try {
    const paginas = await paginaFreguesiaService.getAllPaginaFreguesia();
    res.json(paginas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao procurar páginas' });
  }
}

async function pesquisaPagina(req, res) {
  const pesquisa = req.params.pesquisa;

  try {
    const paginas = await paginaFreguesiaService.pesquisaPagina(pesquisa);
    res.json(paginas);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao procurar páginas' });
  }
}

async function getPaginaFreguesiaById(req, res) {
  const { id } = req.params;

  // Verifica se o 'id' é um número inteiro positivo
  if (!id || isNaN(id) || parseInt(id) <= 0) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const pagina = await paginaFreguesiaService.getPaginaFreguesiaById(id);

    if (!pagina) {
      return res.status(404).json({ error: "Página não encontrada" });
    }

    res.json(pagina);
  } catch (error) {
    console.error("Erro ao buscar página por ID:", error);
    res.status(500).json({ error: "Erro ao buscar página", detalhes: error.message });
  }
}

async function updatePaginaFreguesia(req, res) {
  const { id } = req.params;
  const { nome_pagina } = req.body;

  try {
    const dataAtualizacao = { nome_pagina };

    if (req.files?.foto_perfil?.[0]) {
      const caminhoRelativo = req.files.foto_perfil[0].path.replace(/^.*?uploads[\\/]/, 'uploads/');
      dataAtualizacao.foto_perfil = caminhoRelativo;
    }

    if (req.files?.foto_capa?.[0]) {
      const caminhoRelativo = req.files.foto_capa[0].path.replace(/^.*?uploads[\\/]/, 'uploads/');
      dataAtualizacao.foto_capa = caminhoRelativo;
    }

    const paginaAtualizada = await paginaFreguesiaService.updatePaginaFreguesia(id, dataAtualizacao);
    return res.status(200).json(paginaAtualizada);

  } catch (error) {
    console.error("Erro ao atualizar página:", error);
    return res.status(500).json({
      error: "Erro ao atualizar página",
      detalhes: error.message
    });
  }
}


module.exports = { createPaginaFreguesia, getAllPaginaFreguesia, pesquisaPagina, getPaginaFreguesiaById, updatePaginaFreguesia };
