const { authenticate, authRole } = require('../../src/middlewares/autent.middleware');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'supersecreto';

describe('Middleware: authenticate', () => {
    it('deve falhar sem token', () => {
        const req = { headers: {} };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve falhar com token inválido', () => {
        const req = {
            headers: { authorization: 'Bearer tokenInvalido' }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        authenticate(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido' });
        expect(next).not.toHaveBeenCalled();
    });

    it('deve passar com token válido', () => {
        const token = jwt.sign({ tipo_utilizador: 'admin' }, JWT_SECRET);
        const req = {
            headers: { authorization: `Bearer ${token}` }
        };
        const res = {};
        const next = jest.fn();

        authenticate(req, res, next);

        expect(req.utilizador).toBeDefined();
        expect(req.utilizador.tipo_utilizador).toBe('admin');
        expect(next).toHaveBeenCalled();
    });
});

describe('Middleware: authRole', () => {
    it('deve rejeitar se tipo de utilizador for diferente', () => {
        const req = { utilizador: { tipo_utilizador: 'user' } };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        const next = jest.fn();

        authRole('admin')(req, res, next);

        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.json).toHaveBeenCalled();
        expect(next).not.toHaveBeenCalled();
    });

    it('deve permitir se tipo de utilizador for igual', () => {
        const req = { utilizador: { tipo_utilizador: 'admin' } };
        const res = {};
        const next = jest.fn();

        authRole('admin')(req, res, next);

        expect(next).toHaveBeenCalled();
    });
});