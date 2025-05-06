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

module.exports = { createPaginaFreguesia, getAllPaginaFreguesia, pesquisaPagina };
