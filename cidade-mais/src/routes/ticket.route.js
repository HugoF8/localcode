const express = require('express');
const ticketController = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/criarTicket', ticketController.createTicket);
router.get('/verTickets', ticketController.getAllTickets);
router.get('/verTicketsPendentes', ticketController.getTicketPendente);

module.exports = router;
