const express = require('express');
const moradaController = require('../controllers/morada.controller');

const router = express.Router();

router.post('/criarMorada', moradaController.createMorada);
router.get('/verMorada', moradaController.getAllMorada);

module.exports = router;
