const express = require('express');
const ticketController = require('../controllers/ticket.controller');

const router = express.Router();

router.post('/criarTicket', ticketController.createTicket);
router.get('/verTickets', ticketController.getAllTickets);

module.exports = router;
