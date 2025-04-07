const jwt = require('jsonwebtoken');
const JWT_SECRET = 'supersecreto';

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Token não fornecido' });

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.utilizador = decoded; // podes usar req.user.userId nas rotas
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Token inválido' });
    }
}

module.exports = authenticate;
