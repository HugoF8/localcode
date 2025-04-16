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

    const id_utilizador = req.utilizador.id_utilizador;

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

async function authProprietario(req, res, next) 
{
    const utilizador = req.utilizador;

    let id_utilizador = req.body.id_utilizador;
    try {  
        if (!id_utilizador){

            const { id_post, id_pedido, id_ticket } = req.body;

            if(id_post){
                const post = await prisma.post.findUnique({where:{id_post}})
                id_utilizador = post.id_utilizador
            }
            else if(id_pedido){
                const pedido = await prisma.pedido_pagina.findUnique({where:{id_pedido}})
                id_utilizador = pedido.id_utilizador
            }
            else if(id_ticket){
                const ticket = await prisma.ticket.findUnique({where:{id_ticket}})
                id_utilizador = ticket.id_utilizador
            }
            else {
            return res.status(400).json({ error: 'Nenhum identificador fornecido' });
            }
        }

        if(utilizador.id_utilizador !== id_utilizador){
            return res.status(403).json({ error: 'Não tens mão aqui sai fora mano' });
        }

        next()

    } 
    catch (error) {
        console.error('Erro no authProprietario:', error);
        return res.status(500).json({ error: 'Erro interno ao verificar proprietário' });
    }

}

module.exports = {authSeguir};