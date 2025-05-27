require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');


const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();
// Ficheiros estáticos de uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const comentarioRoutes = require('./routes/comentario.route');
const moderadorRoutes = require('./routes/moderdorPagina.route');
const moradaRoutes = require('./routes/morada.route');
const paginaFreguesiaRoutes = require('./routes/paginaFreguesia.route');
const pedidoPaginaRoutes = require('./routes/pedidoPagina.route');
const perfilRoutes = require('./routes/perfil.route');
const postRoutes = require('./routes/post.route');
const respostaTicketRoutes = require('./routes/respostaTicket.route');
const seguidoresRoutes = require('./routes/seguidoresPagina.route');
const ticketRoutes = require('./routes/ticket.route');
const utilizadorRoutes = require('./routes/utilizador.route');
const autentRoutes = require('./routes/autent.route');
const notificacaoRoutes = require('./routes/notificacao.route');


// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/autent', autentRoutes);
app.use('/api/comentarios', comentarioRoutes);
app.use('/api/moderadores', moderadorRoutes);
app.use('/api/moradas', moradaRoutes);
app.use('/api/paginaFreguesias', paginaFreguesiaRoutes);
app.use('/api/pedidosPagina', pedidoPaginaRoutes);
app.use('/api/perfil', perfilRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/respostasTickets', respostaTicketRoutes);
app.use('/api/seguidores', seguidoresRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/utilizadores', utilizadorRoutes);
app.use('/api/notificacao', notificacaoRoutes);


// Erro global para capturar erros de Multer e outros
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ error: err.message });
  }
  console.error('Erro não tratado:', err);
  res.status(500).json({ error: 'Erro interno do servidor', detalhes: err.message });
});

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, async () => {
    try {
      await prisma.$connect();
      console.log('📦 Base de dados conectada com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar base de dados:', error);
    }
    console.log(`🚀 Servidor ligado em http://localhost:${PORT}`);
  });
}

module.exports = app;