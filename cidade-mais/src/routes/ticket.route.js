const express = require('express');
const ticketController = require('../controllers/ticket.controller');

const router = express.Router();

const { authSeguir, authProprietario } = require('../middlewares/verificacoes.middleware');
const { authenticate, authRole } = require('../middlewares/autent.middleware');
const {authModerador} = require('../middlewares/verificacoes.middleware')
router.use(authenticate);

router.post('/criarTicket', ticketController.createTicket);
router.get('/verTickets', ticketController.getAllTickets);
router.get('/verTicketAberto', authProprietario, ticketController.getTicketAberto);
router.get('/verTicketFechado',authProprietario, ticketController.getTicketFechado);
router.get('/verTicketsPendentes/:id_pagina', authModerador, ticketController.getTicketPendente);
router.patch('/atualizarEstadoTicket/:id_ticket', authModerador, ticketController.atualizarEstadoTicket);
router.patch('/alterarTicket/:id_ticket',authProprietario, ticketController.alterarTicket);
router.delete('/:id_ticket', authProprietario, ticketController.deleteTicket);

module.exports = router;
