const express = require('express');
const pedidoController = require('../controllers/pedidoPagina.controller');

const router = express.Router();

router.post('/criarPedido', pedidoController.createPedidoPagina);
router.get('/verPedidos', pedidoController.getAllPedidoPagina);
router.get('/verPedidosPendentes', pedidoController.getPedidoPendente);
router.patch('/atualizarEstadoPedido', pedidoController.atualizarEstadoPedido);

module.exports = router;
