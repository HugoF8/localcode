const express = require('express');
const paginaFreguesiaController = require('../controllers/paginaFreguesia.controller');
const upload = require('../middlewares/upload.middleware');

const router = express.Router();

const {authenticate} = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarPaginaFreguesia', paginaFreguesiaController.createPaginaFreguesia);
router.get('/verPaginaFreguesia', paginaFreguesiaController.getAllPaginaFreguesia);
router.get('/pesquisarPaginas/:pesquisa', paginaFreguesiaController.pesquisaPagina);
router.patch(
    '/editarPaginaFreguesia/:id',
    upload.fields([
        { name: 'foto_perfil', maxCount: 1 },
        { name: 'foto_capa', maxCount: 1 }
    ]),
    paginaFreguesiaController.updatePaginaFreguesia
);
router.get('/paginaFreguesia/:id', paginaFreguesiaController.getPaginaFreguesiaById);




module.exports = router;
