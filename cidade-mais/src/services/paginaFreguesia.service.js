const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar paginaFreguesia
async function createPaginaFreguesia(data) {
    return prisma.pagina_freguesia.create({ data });
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