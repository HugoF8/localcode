const autentService = require('../services/autent.service');

async function register(req, res) {
    try {
        const { nome, email, password, data_nascimento} = req.body;
        const result = await autentService.register(nome, email, password, data_nascimento);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;
        const result = await autentService.login(email, password);
        res.json(result);
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

module.exports = { register, login };
