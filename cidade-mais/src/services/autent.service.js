const { PrismaClient, tipo_utilizador } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();
const JWT_SECRET = 'supersecreto';

async function register(nome, email, password, data_nascimento) {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Criar utilizador
    const utilizador = await prisma.utilizador.create({
        data: {
            nome,
            email,
            password: hashedPassword,
            data_nascimento: new Date(data_nascimento),
        },
    });

    // Criar perfil associado ao utilizador
    await prisma.perfil.create({
        data: {
            id_utilizador: utilizador.id_utilizador,
            foto_perfil: null,
            foto_capa: null,
            biografia: null,
        },
    });

    // Criar token JWT
    const token = jwt.sign(
        { utilizadorId: utilizador.id_utilizador, tipo_utilizador: utilizador.tipo_utilizador },
        JWT_SECRET,        { expiresIn: '1h' }
    );

    return {
        token,
        utilizador: {
            id_utilizador: utilizador.id_utilizador,
            name: utilizador.nome,
            email: utilizador.email,
            tipo_utilizador: utilizador.tipo_utilizador,
        },
    };
}

async function login(email, password) {
    const utilizador = await prisma.utilizador.findUnique({ where: { email } });
    if (!utilizador) throw new Error('Credenciais inválidas');

    const isMatch = await bcrypt.compare(password, utilizador.password);
    if (!isMatch) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
        { utilizadorId: utilizador.id_utilizador, tipo_utilizador: utilizador.tipo_utilizador },
                  JWT_SECRET, { expiresIn: '1h' }
    );

    return { token,
        utilizador: { id_utilizador: utilizador.id_utilizador,
                      name: utilizador.nome,
                      email: utilizador.email,
                      tipo_utilizador: utilizador.tipo_utilizador
        },
    };
}

module.exports = { register, login };
