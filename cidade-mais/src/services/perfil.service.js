const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar perfil
async function createPerfil(data) {
    return prisma.perfil.create({ data });
}

// Buscar todos os Perfis
async function getAllPerfil() {
    return prisma.perfil.findMany();
}

async function atualizarFotoPerfil(id_utilizador, caminhoImagem) {
    // Primeiro vamos buscar o ID único do perfil
    const perfil = await prisma.perfil.findFirst({
        where: { id_utilizador }, // este campo tem UNIQUE?
    });

    if (!perfil) throw new Error('Perfil não encontrado');

    // Agora fazemos o update com o ID único
    const updatedPerfil = await prisma.perfil.update({
        where: { id_perfil: perfil.id_perfil },
        data: { foto_perfil: caminhoImagem }
    });

    return updatedPerfil;
}



module.exports = { createPerfil, getAllPerfil, atualizarFotoPerfil };
