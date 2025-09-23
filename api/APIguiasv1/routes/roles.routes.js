const express = require('express');
const router = express.Router();
// api\v1\routes\rols.routes.js
const rolsController = require('../controllers/roles.controller');
// Obtener todos los roles
router.get('/', rolsController.getAllRols);

// Obtener un rol por ID
router.get('/:id', rolsController.getRolById);

// Crear un nuevo rol
router.post('/', rolsController.createRol);

// Actualizar un rol por ID
router.put('/:id', rolsController.updateRol);

// Eliminar un rol por ID
router.delete('/:id', rolsController.deleteRol);

module.exports = router;