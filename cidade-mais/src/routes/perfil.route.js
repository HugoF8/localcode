const express = require('express');
const perfilController = require('../controllers/perfil.controller');
const upload = require('../config/multerConfig');
const { authenticate } = require('../middlewares/autent.middleware');

const router = express.Router();
router.use(authenticate);

// Criar e ler perfis
router.post('/criarPerfil', perfilController.createPerfil);
router.get('/verPerfil', perfilController.getAllPerfil);
router.get('/verPerfilUtilizador', perfilController.getPerfilUtilizador);

router.patch(
  '/foto-perfil',
  (req, res, next) => {
    upload.single('imagem')(req, res, err => {
      if (err) {
        // Captura qualquer erro de Multer
        return res.status(400).json({ error: err.message });
      }
      next();
    });
  },
  perfilController.atualizarFotoPerfil
);

module.exports = router;