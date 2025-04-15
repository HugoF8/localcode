const express = require('express');
const pedidoController = require('../controllers/pedidoPagina.controller');

const router = express.Router();

const { authenticate, authRole } = require('../middlewares/autent.middleware');

router.post('/criarPedido',authenticate, pedidoController.createPedidoPagina);
router.get('/verPedidos', authenticate, authRole('admin'), pedidoController.getAllPedidoPagina);
router.get('/verPedidosPendentes', authenticate,authRole('admin'), pedidoController.getPedidoPendente);
router.patch('/atualizarEstadoPedido/:id_pedido', authenticate, authRole('admin'), pedidoController.atualizarEstadoPedido);
router.patch('/alterarPedidoPagina/:id_pedido',authenticate, pedidoController.alterarPedidoPagina);

module.exports = router;
