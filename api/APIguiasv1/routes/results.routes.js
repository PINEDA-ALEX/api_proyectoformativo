const express = require('express');
const router = express.Router();
const resultsController = require('../controllers/results.controller');

// Obtener todos los resultados
router.get('/', resultsController.getAllResults);

// Obtener un resultado por ID
router.get('/:id', resultsController.getResultById);

// Crear un nuevo resultado
router.post('/', resultsController.createResult);

// Actualizar un resultado por ID
router.put('/:id', resultsController.updateResult);

// Eliminar un resultado por ID
router.delete('/:id', resultsController.deleteResult);

module.exports = router;