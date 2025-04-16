const autentController = require('../../src/controllers/autent.controller');
const autentService = require('../../src/services/autent.service');

jest.mock('../../src/services/autent.service'); // Mocka os métodos do service

describe('Autenticação - Controller', () => {
    let req, res;

    beforeEach(() => {
        req = { body: {} };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    });

    describe('register()', () => {
        it('deve registrar um utilizador e devolver token', async () => {
            req.body = { nome: 'Renato', email: 'renato@mail.com', password: '123456', data_nascimento: '1995-01-01' };

            autentService.register.mockResolvedValue({
                token: 'fake-token',
                utilizador: { id: 1, name: 'Renato', email: 'renato@mail.com' },
            });

            await autentController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({
                token: 'fake-token',
                utilizador: { id: 1, name: 'Renato', email: 'renato@mail.com' },
            });
        });

        it('deve retornar erro ao falhar o registo', async () => {
            req.body = {};
            autentService.register.mockRejectedValue(new Error('Erro no registo'));

            await autentController.register(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ error: 'Erro no registo' });
        });
    });

    describe('login()', () => {
        it('deve autenticar e devolver token', async () => {
            req.body = { email: 'renato@mail.com', password: '123456' };

            autentService.login.mockResolvedValue({
                token: 'fake-token',
                utilizador: { id: 1, name: 'Renato', email: 'renato@mail.com' },
            });

            await autentController.login(req, res);

            expect(res.status).not.toHaveBeenCalled(); // usa o status por defeito
            expect(res.json).toHaveBeenCalledWith({
                token: 'fake-token',
                utilizador: { id: 1, name: 'Renato', email: 'renato@mail.com' },
            });
        });

        it('deve retornar erro ao falhar o login', async () => {
            req.body = { email: 'renato@mail.com', password: 'errado' };
            autentService.login.mockRejectedValue(new Error('Credenciais inválidas'));

            await autentController.login(req, res);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.json).toHaveBeenCalledWith({ error: 'Credenciais inválidas' });
        });
    });
});