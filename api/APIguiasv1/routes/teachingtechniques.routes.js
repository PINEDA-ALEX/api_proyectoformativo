const express = require('express');
const router = express.Router();
const teachingtechniquesController = require('../controllers/teachingtechniques.controller');

// Obtener todas las técnicas de enseñanza
router.get('/', teachingtechniquesController.getAllTeachingtechniques);

// Obtener una técnica de enseñanza por ID
router.get('/:id', teachingtechniquesController.getTeachingtechniqueById);

// Crear una nueva técnica de enseñanza
router.post('/', teachingtechniquesController.createTeachingtechnique);

// Actualizar una técnica de enseñanza por ID
router.put('/:id', teachingtechniquesController.updateTeachingtechnique);

// Eliminar una técnica de enseñanza por ID
router.delete('/:id', teachingtechniquesController.deleteTeachingtechnique);

module.exports = router;    