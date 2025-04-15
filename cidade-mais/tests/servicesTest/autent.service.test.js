const { register, login } = require('../../src/services/autent.service');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

beforeAll(async () => {
    await prisma.utilizador.deleteMany(); // limpa os users antes dos testes
});

describe('Autenticação - Service', () => {
    const mockUser = {
        nome: 'Test User',
        email: 'testuser@example.com',
        password: '123456',
        data_nascimento: '1990-01-01',
    };

    test('register deve criar um utilizador e retornar token', async () => {
        const res = await register(
            mockUser.nome,
            mockUser.email,
            mockUser.password,
            mockUser.data_nascimento
        );

        expect(res.token).toBeDefined();
        expect(res.utilizador.email).toBe(mockUser.email);

        const decoded = jwt.verify(res.token, 'supersecreto');
        expect(decoded.utilizadorId).toBeDefined();
    });

    test('login deve autenticar utilizador com credenciais válidas', async () => {
        const res = await login(mockUser.email, mockUser.password);

        expect(res.token).toBeDefined();
        expect(res.utilizador.email).toBe(mockUser.email);
    });

    test('login deve falhar com email errado', async () => {
        await expect(login('emailinvalido@aaa.com', '123456')).rejects.toThrow('Credenciais inválidas');
    });

    test('login deve falhar com password errada', async () => {
        await expect(login(mockUser.email, 'passworderrada')).rejects.toThrow('Credenciais inválidas');
    });
});