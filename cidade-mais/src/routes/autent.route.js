const express = require('express');
const router = express.Router();
const autentController = require('../controllers/autent.controller');

router.post('/registar', autentController.register);
router.post('/login', autentController.login);

module.exports = router;
