const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');

// Ruta para login por nombre de usuario
router.post('/login', authController.loginUser);

module.exports = router;
