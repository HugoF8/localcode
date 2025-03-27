require('dotenv').config();
const express = require('express');
const cors = require('cors');
const utilizadorRoutes = require('./routes/utilizador.route');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/utilizadores', utilizadorRoutes);

// Teste de conexão com o banco de dados
async function main() {
    try {
        await prisma.$connect();
        console.log('📦 Base de dados conectada com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar base de dados:', error);
    }
}

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await main();
    console.log(`🚀 Servidor ligado em http://localhost:${PORT}`);
});
