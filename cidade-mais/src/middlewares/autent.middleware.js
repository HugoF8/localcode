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

function authRole(tipoUser) {
    return (req, res, next) => {
      const utilizador = req.utilizador;
      if (utilizador.tipo_utilizador !== tipoUser) {
        return res.status(403).json({
          error: `Acesso negado: tipo "${utilizador.tipo_utilizador}" não possui permissões para esta ação (requer "${tipoUser}").`
        });
      }
      next();
    };
  }
  

module.exports = {authenticate, authRole};
