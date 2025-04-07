const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

async function register(nome, email, password, data_nascimento) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const utilizador = await prisma.utilizador.create({
        data: { nome, email, password: hashedPassword, data_nascimento: new Date(data_nascimento) },
    });

    const token = jwt.sign({ utilizadorId: utilizador.id_utilizador }, JWT_SECRET, { expiresIn: '1h' });
    return { token, utilizador: { id: utilizador.id_utilizador, name: utilizador.nome, email: utilizador.email } };
}

async function login(email, password) {
    const utilizador = await prisma.utilizador.findUnique({ where: { email } });
    if (!utilizador) throw new Error('Credenciais inválidas');

    const isMatch = await bcrypt.compare(password, utilizador.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign({ utilizadorId: utilizador.id_utilizador }, JWT_SECRET, { expiresIn: '1h' });
    return { token, utilizador: { id: utilizador.id_utilizador, name: utilizador.nome, email: utilizador.email } };
}

module.exports = { register, login };
