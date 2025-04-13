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

module.exports = { createPaginaFreguesia, getAllPaginaFreguesia, pesquisaPagina };