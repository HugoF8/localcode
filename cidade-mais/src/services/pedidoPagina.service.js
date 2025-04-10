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
    let novoEstado;

    if(bol==true)
    {
        novoEstado= "aprovado";
    }
    else
        novoEstado="recusado";

    const pedidoAtualizado = await prisma.pedido_pagina.update({
        where: { id_pedido },
        data: {
            estado_pedido: novoEstado,
        },
        })   
    
    if(novoEstado==true)
    {
        if (novoEstado === "aprovado") {
            // Criar a página freguesia com dados do pedido
            await prisma.pagina_freguesia.create({
              data: {
                id_utilizador: pedidoAtual.id_utilizador,
                id_morada: pedidoAtual.id_morada,
                morada: pedidoAtual.morada,
                nome_pagina: pedidoAtual.nome_freguesia,
                descricao: "Bem-vindo à nova página da freguesia!", // valor default
                foto_perfil: "/img/default-perfil.png",             // valor default
                foto_capa: "/img/default-capa.jpg"                  // valor default
              }
            });
          }
        }
    

    return pedidoAtualizado 
    
}
module.exports = { createPedidoPagina, getAllPedidoPagina, getPedidoPendente, atualizarEstadoPedido};
