const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

// Obtener todos los usuarios
router.get('/', usersController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', usersController.getUserById);

// Crear un nuevo usuario
router.post('/', usersController.createUser);

// Actualizar un usuario por ID
router.put('/:id', usersController.updateUser);

// Eliminar un usuario por ID
router.delete('/:id', usersController.deleteUser);

module.exports = router;