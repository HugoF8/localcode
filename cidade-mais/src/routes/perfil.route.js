const express = require('express');
const perfilController = require('../controllers/perfil.controller');
const router = express.Router();
const upload = require('../config/multerConfig');

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarPerfil', perfilController.createPerfil);
router.get('/verPerfil', perfilController.getAllPerfil);
router.patch('/foto-perfil', upload.single('imagem'), perfilController.atualizarFotoPerfil);

router.use((err, req, res, next) => {
    if (err.message === 'Apenas ficheiros de imagem são permitidos') {
        return res.status(400).json({ error: err.message });
    }
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    }
    next(err);
});

module.exports = router;
