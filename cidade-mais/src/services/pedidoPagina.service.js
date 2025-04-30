const { PrismaClient, tipo_notificacao } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const { createMorada} = require ('./morada.service')
const prisma = new PrismaClient();


// Criar pedidoPagina
async function createPedidoPagina(data) {
    //Criar a morada
    const  moradaCriada = await createMorada({
      freguesia: data.freguesia, 
      rua: data.rua,
      cidade: data.cidade,
      codigo_postal: parseInt(data.codigo_postal)
    });
  
    //Criar o pedido
    const pedido = {
      nomefreguesia: data.nomefreguesia,
      dados_comprovacao: data.dados_comprovacao,
      id_utilizador: data.id_utilizador,
      id_morada: moradaCriada.id_morada,
      estado_pedido: data.estado_pedido
    };
  
    //Criar o registo na tabela pedido_pagina
    return prisma.pedido_pagina.create({
      data: pedido
    });
  }
  

// Buscar todos os pedidoPagina
async function getAllPedidoPagina() {
    return prisma.pedido_pagina.findMany();
}

async function getPedidoPendente() {
    return prisma.pedido_pagina.findMany({
        where: {
            estado_pedido:'pendente'
        }
    })
}

async function getPedidoAprovado(id_utilizador) {
    return prisma.pedido_pagina.findMany({
        where: {
            id_utilizador:id_utilizador,
            estado_pedido:'aprovado'
        }
    })
}

async function getPedidoReprovado(id_utilizador) {
    return prisma.pedido_pagina.findMany({
        where: {
            id_utilizador:id_utilizador,
            estado_pedido:'reprovado'
        }
    })
}

async function alterarPedidoPagina(id_pedido, dados) {
    const pedidoAlterado = await prisma.pedido_pagina.update({
        where: { id_pedido: id_pedido },
        data: {
            dados_comprovacao: dados
        },
    });
    return pedidoAlterado;
}

async function atualizarEstadoPedido(id_pedido, bol) {


    const pedidoAtual = await prisma.pedido_pagina.findUnique({where:{id_pedido}})

    const novoEstado = bol ? "aprovado" : "reprovado";
    const notificacao = bol ? tipo_notificacao.Aprovado : tipo_notificacao.Recusado;

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
                nome_pagina: pedidoAtual.nomefreguesia
              }
            });
        }

        if(notificacao) {await createNotificacao({id_utilizador: pedidoAtualizado.id_utilizador, id_pedido: pedidoAtualizado.id_pedido,tipo_notificacao: notificacao})}
 
    return pedidoAtualizado 
    
}
module.exports = { createPedidoPagina, getAllPedidoPagina, getPedidoPendente, getPedidoAprovado, getPedidoReprovado, atualizarEstadoPedido, alterarPedidoPagina};