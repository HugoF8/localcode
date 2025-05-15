const { PrismaClient, tipo_notificacao, funcao_moderador } = require('@prisma/client');
const { createNotificacao } = require('./notificacao.service');
const { createMorada} = require ('./morada.service')
const prisma = new PrismaClient();


// Criar pedidoPagina
async function createPedidoPagina(data) {
  let id_morada;

  if (data.id_morada) {
    id_morada = data.id_morada;
  } else {
    const moradaCriada = await createMorada({
      freguesia: data.freguesia, 
      rua: data.rua,
      cidade: data.cidade,
      codigo_postal: parseInt(data.codigo_postal)
    });
    id_morada = moradaCriada.id_morada;
  }

  const pedido = {
    nomefreguesia: data.nomefreguesia,
    dados_comprovacao: data.dados_comprovacao,
    id_utilizador: data.id_utilizador,
    id_morada: id_morada,
    estado_pedido: data.estado_pedido ?? 'pendente' // default para testes
  };

  return prisma.pedido_pagina.create({
    data: pedido
  });
}
  

// Buscar todos os pedidoPagina
async function getAllPedidoPagina() {
  return prisma.pedido_pagina.findMany({
    include: { morada: true }   // <— inclui o objecto morada
  })
}

async function getPedidoPendente() {
    return prisma.pedido_pagina.findMany({
        where: {
            estado_pedido:'pendente'
        },
        include: { morada: true },
        orderBy: { data_pedido: 'desc' }
    })
}

async function getPedidoAprovado(id_utilizador) {
    return prisma.pedido_pagina.findMany({
        where: {
            id_utilizador:id_utilizador,
            estado_pedido:'aprovado'
        },
        include: { morada: true },
        orderBy: { data_pedido: 'desc' }
    })
}

async function getPedidoReprovado(id_utilizador) {
    return prisma.pedido_pagina.findMany({
        where: {
            id_utilizador:id_utilizador,
            estado_pedido:'reprovado'
        },
        include: { morada: true },
        orderBy: { data_pedido: 'desc' }
    })
}

async function alterarPedidoPagina(id_pedido, dados) {
  // 1) Buscar pedido atual + morada
  const pedidoAtual = await prisma.pedido_pagina.findUnique({
    where: { id_pedido },
    include: { morada: true }
  });

  if (!pedidoAtual) {
    throw new Error('Pedido não encontrado');
  }

  // 2) Atualizar a morada associada
  await prisma.morada.update({
    where: { id_morada: pedidoAtual.id_morada },
    data: {
      freguesia: dados.freguesia,
      cidade:   dados.cidade,
      rua:      dados.rua,
      codigo_postal: parseInt(dados.codigo_postal, 10)
    }
  });

  // 3) Atualizar o próprio pedido
  const pedidoAlterado = await prisma.pedido_pagina.update({
    where: { id_pedido },
    data: {
      nomefreguesia:    dados.nomefreguesia,
      dados_comprovacao: dados.dados_comprovacao,
      estado_pedido:     'pendente'          // força volta a pendente
    },
    include: {
      morada: true                          // para retornar já a morada atualizada
    }
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
           const pagina = await prisma.pagina_freguesia.create({
              data: {
                id_utilizador: pedidoAtual.id_utilizador,
                id_morada: pedidoAtual.id_morada,
                nome_pagina: pedidoAtual.nomefreguesia
              }
            });

            
              await prisma.moderador_pagina.create({
                data: {
                  id_utilizador: pagina.id_utilizador,
                  id_pagina: pagina.id,
                  funcao_moderador: 'moderador',
                },
              });
        }

        if(notificacao) {await createNotificacao({id_utilizador: pedidoAtualizado.id_utilizador, id_pedido: pedidoAtualizado.id_pedido,tipo_notificacao: notificacao})}
 
    return pedidoAtualizado 
    
}
module.exports = { createPedidoPagina, getAllPedidoPagina, getPedidoPendente, getPedidoAprovado, getPedidoReprovado, atualizarEstadoPedido, alterarPedidoPagina};