const express = require('express');
const router = express.Router();
const learningmomentsController = require('../controllers/learningmoments.controller');

// Obtener todos los momentos de aprendizaje
router.get('/', learningmomentsController.getAllLearningmoments);

// Obtener las técnicas didácticas de un momento específico (DEBE IR ANTES de /:id)
router.get('/:id/teachingTechniques', learningmomentsController.getLearningmomentTechniques);

// Obtener un momento de aprendizaje por ID
router.get('/:id', learningmomentsController.getLearningmomentById);

// Crear un nuevo momento de aprendizaje
router.post('/', learningmomentsController.createLearningmoment);

// Actualizar un momento de aprendizaje por ID
router.put('/:id', learningmomentsController.updateLearningmoment);

// Eliminar un momento de aprendizaje por ID
router.delete('/:id', learningmomentsController.deleteLearningmoment);

module.exports = router;