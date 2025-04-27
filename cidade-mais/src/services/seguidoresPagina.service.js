
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar Seguidor
async function createUSeguidor(data) {
    return prisma.seguidores_pagina.create({ data });
}

// Buscar todos os seguidores
async function getAllUSeguidores() {
    return prisma.seguidores_pagina.findMany();
}

async function getPaginasSeguidas(id_utilizador) {
    return prisma.seguidores_pagina.findMany({
        where:{
            id_utilizador: id_utilizador,
        }
    })
}

async function pararSeguir(id_utilizador,id_pagina){
    return prisma.seguidores_pagina.deleteMany({
        where:{
            id_utilizador: id_utilizador,
            id_pagina: id_pagina
        }
    })
}

module.exports = { createUSeguidor, getAllUSeguidores, getPaginasSeguidas, pararSeguir};
