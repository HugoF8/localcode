const moderadorPaginaService = require('../services/moderadorPagina.service');

// Cria um novo moderador de página
async function createModeradorPagina(req, res) {
    console.log(req.body)
    try {
        const moderadorPagina = await moderadorPaginaService.createModeradorPagina(req.body);
        res.status(201).json(moderadorPagina);
    } catch (error) {
        console.error('Erro ao criar Moderador de Página:', error);
        res.status(500).json({ error: 'Erro ao criar Moderador de Página', detalhes: error.message });
    }
}

async function deleteModeradorPagina(req, res) {
    const { id_pagina, id_utilizador } = req.params;
    try {
        const moderadorPagina = await moderadorPaginaService.deleteModerador({
            id_pagina: Number(id_pagina),
            id_utilizador: Number(id_utilizador)
        });
        res.status(200).json(moderadorPagina);
    } catch (error) {
        console.error('Erro ao apagar Moderador de Página:', error);
        res.status(500).json({ error: 'Erro ao apagar Moderador de Página', detalhes: error.message });
    }
}



// Busca todos os moderadores de página
async function getAllModeradorPagina(req, res) {
    try {
        const moderadores = await moderadorPaginaService.getAllModeradorPagina();
        res.json(moderadores);
    } catch (error) {
        console.error('Erro ao buscar Moderadores de Página:', error);
        res.status(500).json({ error: 'Erro ao procurar Moderadores de Página' });
    }
}

async function verPaginasModeradas(req, res) {
  const id_utilizador_param = req.params.id_utilizador;
  const id_utilizador = id_utilizador_param
    ? Number(id_utilizador_param)
    : req.utilizador?.utilizadorId;

  if (!id_utilizador) {
    return res.status(400).json({ error: 'ID do utilizador não fornecido' });
  }

  try {
    const moderadores = await moderadorPaginaService.verPaginasModeradas(id_utilizador);
    res.json(moderadores);
  } catch (error) {
    console.error('Erro ao buscar Moderadores de Página:', error);
    res.status(500).json({ error: 'Erro ao procurar Moderadores de Página' });
  }
}


module.exports = { createModeradorPagina, getAllModeradorPagina, verPaginasModeradas, deleteModeradorPagina };
