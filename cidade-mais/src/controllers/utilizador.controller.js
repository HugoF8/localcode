const utilizadorService = require('../services/utilizador.service');
const userTypeCache = new Map();
const CACHE_TTL = 10 * 60 * 1000;

// Criar utilizadores
async function createUtilizador(req, res) {
    try {
        const { nome, email, password, data_nascimento } = req.body;

        if (!nome || nome.trim() === '') {
            return res.status(400).json({ error: "O campo 'nome' é obrigatório." });
        }

        if (!email || !email.includes('@') || !email.includes('.')) {
            return res.status(400).json({ error: "O campo 'email' é inválido." });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({ error: "A 'password' deve ter pelo menos 6 caracteres." });
        }

        const nascimento = new Date(data_nascimento);
        if (!data_nascimento || isNaN(nascimento.getTime())) {
            return res.status(400).json({ error: "Data de nascimento inválida." });
        }

        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);
        if (nascimento > hoje) {
            return res.status(400).json({ error: "A data de nascimento não pode ser no futuro." });
        }

        const utilizador = await utilizadorService.createUtilizador({
            nome,
            email,
            password,
            data_nascimento: nascimento
        });

        res.status(201).json(utilizador);
    } catch (error) {
        console.error("Erro ao criar utilizador:", error);

        // Erro de email duplicado tratado de forma mais clara
        if (error.code === 'P2002' && error.meta?.target?.includes('email')) {
            return res.status(400).json({ error: "Email já está em uso." });
        }

        res.status(500).json({ error: "Erro ao criar utilizador", detalhes: error.message });
    }
}

async function getUtilizadorPorId(req, res){
    const id_utilizador = req.utilizador?.utilizadorId;
    try {
        const utilizadores = await utilizadorService.getUtilizadorById(id_utilizador);
        res.json(utilizadores);
    } catch (error) {
        console.error("Erro ao buscar utilizador:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar utilizadores", detalhes: error.message });
    }
}


// Buscar todos os utilizadores
async function getAllUtilizadores(req, res) {
    try {
        const utilizadores = await utilizadorService.getAllUtilizadores();
        res.json(utilizadores);
    } catch (error) {
        console.error("Erro ao buscar utilizador:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar utilizadores", detalhes: error.message });
    }
}

async function alterarTipoUtilizadores(req, res) {
    const {id_utilizador} = req.body
    const {tipo} =req.body
   
    try {
        const utilizadores = await utilizadorService.alterarTipoUser(tipo,id_utilizador);
        res.json(utilizadores);
    } catch (error) {
        console.error("Erro ao buscar utilizador:", error); // Mostra o erro real no terminal
        res.status(500).json({ error: "Erro ao buscar utilizadores", detalhes: error.message });
    }
}

module.exports = { createUtilizador, getUtilizadorPorId, getAllUtilizadores, alterarTipoUtilizadores };
