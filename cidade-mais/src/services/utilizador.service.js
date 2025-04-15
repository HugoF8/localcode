const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar utilizador
async function createUtilizador(data) {
    return prisma.utilizador.create({ data });
}

// Buscar todos os utilizador
async function getAllUtilizadores() {
    return prisma.utilizador.findMany();
}

async function alterarTipoUser(tipo, id_utilizador) {

    const novoUser = prisma.utilizador.update({
        where: { id_utilizador },
        data: {
          tipo_utilizador: tipo,
        },
    })

    return novoUser;

}

module.exports = { createUtilizador, getAllUtilizadores, alterarTipoUser };
