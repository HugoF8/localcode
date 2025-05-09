const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar perfil
async function createPerfil(data) {
    return prisma.perfil.create({ data });
}

// Buscar todos os Perfis
async function getAllPerfil() {
  return prisma.perfil.findMany({
    include: {
      utilizador: true // Inclui dados do utilizador
    }
  });
}

async function getPerfilUtilizador(id_utilizador) {
  return prisma.perfil.findFirst({
    where: { id_utilizador },
    include: { utilizador: true }
  });
}

async function atualizarFotoPerfil(id_utilizador, caminhoImagem) {
    const perfil = await prisma.perfil.findFirst({
      where: { id_utilizador },
    });
  
    if (!perfil) throw new Error('Perfil não encontrado');
  
    const relativePath = caminhoImagem.replace(/^.*?uploads[\\/]/, 'uploads/');
  
    const updatedPerfil = await prisma.perfil.update({
      where: { id_perfil: perfil.id_perfil },
      data: { foto_perfil: relativePath }
    });

    return {
        foto_perfil: updatedPerfil.foto_perfil
      };
}

async function atualizarFotoCapa(id_utilizador, caminhoImagem) {
  const perfil = await prisma.perfil.findFirst({
    where: { id_utilizador },
  });

  if (!perfil) throw new Error('Perfil não encontrado');

  const relativePath = caminhoImagem.replace(/^.*?uploads[\\/]/, 'uploads/');

  const updatedPerfil = await prisma.perfil.update({
    where: { id_perfil: perfil.id_perfil },
    data: { foto_capa: relativePath }
  });

  return {
    foto_capa: updatedPerfil.foto_capa
  };
}

module.exports = { createPerfil, getAllPerfil, getPerfilUtilizador, atualizarFotoPerfil, atualizarFotoCapa };
