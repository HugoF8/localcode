const { PrismaClient } = require('@prisma/client');
const { deleteModeradorPagina } = require('../controllers/moderadorPagina.controller');
const prisma = new PrismaClient();

// Criar moderadorPagina
async function createModeradorPagina(data) {
    return prisma.moderador_pagina.create({ data });
}

async function deleteModerador(data) {
  const moderador = await prisma.moderador_pagina.findFirst({
    where: {
      id_pagina: data.id_pagina,
      id_utilizador: data.id_utilizador,
    },
  });

  if (!moderador) {
    throw new Error('Moderador não encontrado');
  }

  return prisma.moderador_pagina.delete({
    where: {
      id_moderador: moderador.id_moderador,
    },
  });
}


async function verPaginasModeradas (id_utilizador) {
    return prisma.moderador_pagina.findMany({
        where: {
            id_utilizador: id_utilizador
        }
    });
} 

// Buscar todos os moderadorPagina
async function getAllModeradorPagina() {
    return prisma.moderador_pagina.findMany();
}

module.exports = { createModeradorPagina, deleteModerador, getAllModeradorPagina, verPaginasModeradas };
