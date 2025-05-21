const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createModeradorPagina} = require('./moderadorPagina.service')
const { createSeguidor } = require('./seguidoresPagina.service')

// Criar paginaFreguesia
async function createPaginaFreguesia(data) {
  let pagina_criada = await prisma.pagina_freguesia.create({ data });

  await createModeradorPagina({
    id_utilizador: pagina_criada.id_utilizador,
    id_pagina: pagina_criada.id_pagina,
    funcao:"moderador"
  });

  await createSeguidor ({
    id_utilizador: pagina_criada.id_utilizador,
    id_pagina: pagina_criada.id_pagina,
  })

}

// Buscar todos os paginaFreguesia
async function getAllPaginaFreguesia() {
    return prisma.pagina_freguesia.findMany();
}

async function pesquisaPagina(pesquisa) {
    return prisma.pagina_freguesia.findMany({
      where: {
        nome_pagina: {
          contains: pesquisa,
          mode: 'insensitive'
        }
      }
    });
  }

async function getPaginaFreguesiaById(id) {
    return prisma.pagina_freguesia.findUnique({
        where: { id_pagina: parseInt(id) }
    });
}

async function updatePaginaFreguesia(id_pagina, { nome_pagina, foto_capa, foto_perfil }) {
    const paginaAtualizada = await prisma.pagina_freguesia.update({
        where: { id_pagina: parseInt(id_pagina) },
        data: {
            nome_pagina: nome_pagina,
            foto_capa: foto_capa,
            foto_perfil: foto_perfil,
        },
    });

    return paginaAtualizada;
}


module.exports = { createPaginaFreguesia, getAllPaginaFreguesia, pesquisaPagina, getPaginaFreguesiaById, updatePaginaFreguesia };