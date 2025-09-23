const express = require('express');
const router = express.Router();
const competencesController = require('../controllers/competences.controller');

// Obtener todas las competencias
router.get('/', competencesController.getAllCompetences);

// Obtener una competencia por ID
router.get('/:id', competencesController.getCompetenceById);

// Crear una nueva competencia
router.post('/', competencesController.createCompetence);

// Actualizar una competencia por ID
router.put('/:id', competencesController.updateCompetence);

// Eliminar una competencia por ID
router.delete('/:id', competencesController.deleteCompetence);

module.exports = router;