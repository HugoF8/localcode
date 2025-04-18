const express = require('express');
const perfilController = require('../controllers/perfil.controller');
const router = express.Router();
const upload = require('../config/multerConfig');

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarPerfil', perfilController.createPerfil);
router.get('/verPerfil', perfilController.getAllPerfil);

// rota que recebe uma imagem e atualiza o perfil
router.patch('/foto-perfil', upload.single('imagem'), perfilController.atualizarFotoPerfil);


module.exports = router;
