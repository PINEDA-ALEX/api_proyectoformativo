const express = require('express');
const router = express.Router();
const specialtiesController = require('../controllers/specialties.controller');

// Obtener todas las especialidades
router.get('/', specialtiesController.getAllSpecialties);

// Obtener una especialidad por ID
router.get('/:id', specialtiesController.getSpecialtyById);

// Crear una nueva especialidad
router.post('/', specialtiesController.createSpecialty);

// Actualizar una especialidad por ID
router.put('/:id', specialtiesController.updateSpecialty);

// Eliminar una especialidad por ID
router.delete('/:id', specialtiesController.deleteSpecialty);

module.exports = router;