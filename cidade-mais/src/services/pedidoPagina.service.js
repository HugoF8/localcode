const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Criar pedidoPagina
async function createPedidoPagina(data) {
    return prisma.pedidoPagina.create({ data });
}

// Buscar todos os pedidoPagina
async function getAllPedidoPagina() {
    return prisma.pedidoPagina.findMany();
}

async function getPedidoPendente() {
    return prisma.post.findMany({ 
        where:{
            estado_pedido:'pendente'
        }
    })
}

async function atualizarEstadoPedido(id_pedido, bol,) {
    
    const pedidoAtual = await prisma.pedido_pagina.findUnique({where:{id_pedido}})

    const novoEstado = bol ? "aprovado" : "recusado";


    const pedidoAtualizado = await prisma.pedido_pagina.update({
        where: { id_pedido },
        data: {
            estado_pedido: novoEstado,
        },
        })   
    
    
        if (novoEstado === "aprovado") {
            // Criar a página freguesia com dados do pedido
            await prisma.pagina_freguesia.create({
              data: {
                id_utilizador: pedidoAtual.id_utilizador,
                id_morada: pedidoAtual.id_morada,
                morada: pedidoAtual.morada,
                nome_pagina: "Freguesia",
              }
            });
          }
        

    return pedidoAtualizado 
    
}
module.exports = { createPedidoPagina, getAllPedidoPagina, getPedidoPendente, atualizarEstadoPedido};
