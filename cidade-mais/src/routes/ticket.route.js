const express = require('express');
const ticketController = require('../controllers/ticket.controller');

const router = express.Router();

const { authenticate, authRole } = require('../middlewares/autent.middleware');
router.use(authenticate);

router.post('/criarTicket', ticketController.createTicket);
router.get('/verTickets', ticketController.getAllTickets);
router.get('/verTicketAberto', ticketController.getTicketAberto);
router.get('/verTicketFechado', ticketController.getTicketFechado);
router.get('/verTicketsPendentes', authRole('moderador'), ticketController.getTicketPendente);
router.patch('/atualizarEstadoTicket/:id_ticket', authRole('moderador'), ticketController.atualizarEstadoTicket);
router.patch('/alterarTicket/:id_ticket', ticketController.alterarTicket);

module.exports = router;
