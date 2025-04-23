const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function authSeguir(req, res, next) {
    let { id_pagina } = req.body;
    const {id_post} = req.body;

    if (!id_pagina && id_post) //codigo sujo (mas tem que ser)
    {
        const post = await prisma.post.findUnique({where:{id_post}})
        if (!post) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }
        id_pagina = post.id_pagina;
    }
    //else{return res.status(400).json({error: 'id_pagina não fornecido.' });}

    const id_utilizador = req.utilizador.utilizadorId;
    
    try {
        const existe = await prisma.seguidores_pagina.findFirst({
            where: {
                id_utilizador: id_utilizador,
                id_pagina: id_pagina
            },
        });

        if (!existe) {
            return res.status(403).json({ error: 'Acesso negado. Utilizador não segue esta página.' });
        }

        next();

    } catch (error) {
        console.error('Erro ao verificar seguidores:', error);
        return res.status(500).json({ error: 'Erro interno ao verificar permissão.' });
    }
}

async function authProprietario(req, res, next) {
    const id_utilizadorAtual = req.utilizador.utilizadorId;
    let { id_utilizador } = req.body;
  
    // Inicializa os possíveis identificadores
    let id_post = null;
    let id_pedido = null;
    let id_ticket = null;
  
    try {
      if (!id_utilizador) {
        // Extrai dos parâmetros e corpo
        ({ id_post, id_pedido, id_ticket } = { ...req.params, ...req.body });
  
        id_post = Number(id_post);
        id_pedido = Number(id_pedido);
        id_ticket = Number(id_ticket);
  
        if (!isNaN(id_post)) {
          const post = await prisma.post.findUnique({ where: { id_post } });
          if (!post) return res.status(404).json({ error: 'Post não encontrado' });
          id_utilizador = post.id_utilizador;
        } else if (!isNaN(id_pedido)) {
          const pedido = await prisma.pedido_pagina.findUnique({ where: { id_pedido } });
          if (!pedido) return res.status(404).json({ error: 'Pedido não encontrado' });
          id_utilizador = pedido.id_utilizador;
        } else if (!isNaN(id_ticket)) {
          const ticket = await prisma.ticket.findUnique({ where: { id_ticket } });
          if (!ticket) return res.status(404).json({ error: 'Ticket não encontrado' });
          id_utilizador = ticket.id_utilizador;
        } else {
          // Se não conseguir encontrar nenhum id — assume o próprio utilizador
          id_utilizador = id_utilizadorAtual;
        }
      }
  
      if (id_utilizadorAtual !== id_utilizador) {
        return res.status(403).json({
          error: "Não autorizado a aceder a este recurso",
          detalhe: { id_utilizadorAtual, id_utilizador }
        });
      }
  
      next();
    } catch (error) {
      console.error('Erro no authProprietario:', error);
      return res.status(500).json({ error: 'Erro interno ao verificar proprietário' });
    }
  }
  

async function authModerador(req, res, next) {
    let { id_post, id_ticket } = { ...req.params, ...req.body };
    const id_utilizador = req.utilizador.utilizadorId;

    let postick = null;

    try {
        if (id_post != null) {
            id_post = Number(id_post);
            postick = await prisma.post.findUnique({ where: { id_post } });
            if (!postick) return res.status(404).json({ error: 'Post não encontrado' });
        } else if (id_ticket != null) {
            id_ticket = Number(id_ticket);
            postick = await prisma.ticket.findUnique({ where: { id_ticket } });
            if (!postick) return res.status(404).json({ error: 'Ticket não encontrado' });
        } else {
            return res.status(400).json({ error: 'Nenhum identificador fornecido' });
        }

        // Verifica se o utilizador é moderador da página associada
        const administrador = await prisma.moderador_pagina.findFirst({
            where: {
              id_utilizador: id_utilizador,
              id_pagina: postick.id_pagina
            }
          });

        if (!administrador) {
            return res.status(403).json({error: "Não autorizado a aceder a este recurso",id_utilizador,id_pagina: postick.id_pagina});
        }

        next();
    } catch (error) {
        console.error('Erro no authModerador:', error);
        return res.status(500).json({ error: 'Erro interno ao verificar permissões de moderação' });
    }
}



module.exports = {authSeguir, authProprietario, authModerador};