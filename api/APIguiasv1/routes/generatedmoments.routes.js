const express = require('express');
const router = express.Router();
const generatedmomentsController = require('../controllers/generatedmoments.controller');

// Obtener todos los momentos generados
router.get('/', generatedmomentsController.getAllGeneratedmoments);

// Obtener un momento generado por ID
router.get('/:id', generatedmomentsController.getGeneratedmomentById);

// Crear un nuevo momento generado
router.post('/', generatedmomentsController.createGeneratedmoment);

// Actualizar un momento generado por ID
router.put('/:id', generatedmomentsController.updateGeneratedmoment);

// Eliminar un momento generado por ID
router.delete('/:id', generatedmomentsController.deleteGeneratedmoment);

module.exports = router;