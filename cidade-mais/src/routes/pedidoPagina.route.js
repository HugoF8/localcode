const express = require('express');
const upload = require('../config/multerConfig');            // já retorna multer({…})
const pedidoController = require('../controllers/pedidoPagina.controller');
const { authenticate, authRole } = require('../middlewares/autent.middleware');
const { authProprietario } = require('../middlewares/verificacoes.middleware');

const router = express.Router();

router.post(
  '/criarPedido',
  authenticate,
  upload.single('dados_comprovacao'),  
  pedidoController.createPedidoPagina
);
router.get('/verPedidos', authenticate, authRole('admin'), pedidoController.getAllPedidoPagina);
router.get('/verPedidosPendentes', authenticate,authRole('admin'), pedidoController.getPedidoPendente);
router.patch('/atualizarEstadoPedido/:id_pedido', authenticate, authRole('admin'), pedidoController.atualizarEstadoPedido);
router.patch('/alterarPedidoPagina/:id_pedido',authenticate, authProprietario, pedidoController.alterarPedidoPagina);

router.get('/PedidosReprovados', authenticate, authProprietario, pedidoController.getPedidoReprovado);
router.get('/PedidosAprovados', authenticate, authProprietario, pedidoController.getPedidoAprovado);

module.exports = router;
