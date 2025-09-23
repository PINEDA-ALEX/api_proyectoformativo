const express = require('express');
const router = express.Router();
const trainigprogramsController = require('../controllers/trainigprograms.controller');

// Obtener todos los programas de formación
router.get('/', trainigprogramsController.getAllTrainigprograms);

// Obtener un programa de formación por ID
router.get('/:id', trainigprogramsController.getTrainigprogramById);

// Crear un nuevo programa de formación
router.post('/', trainigprogramsController.createTrainigprogram);

// Actualizar un programa de formación por ID
router.put('/:id', trainigprogramsController.updateTrainigprogram);

// Eliminar un programa de formación por ID
router.delete('/:id', trainigprogramsController.deleteTrainigprogram);

module.exports = router;