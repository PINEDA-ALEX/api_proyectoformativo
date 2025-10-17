const express = require('express');
const router = express.Router();
const guidesController = require('../controllers/guides.controller');

// Obtener todas las guías
router.get('/', guidesController.getAllGuides);

// Obtener una guía por ID
router.get('/:id', guidesController.getGuideById);

// 🔹 Obtener los resultados de aprendizaje de una guía
router.get('/:id/results', guidesController.getGuideResults);

// 🔹 Actualizar solo los resultados de aprendizaje de una guía
router.put('/:id/results', guidesController.updateGuideResults);

// Crear una nueva guía
router.post('/', guidesController.createGuide);

// Actualizar una guía por ID (incluye resultados si vienen en el body)
router.put('/:id', guidesController.updateGuide);

// Eliminar una guía por ID
router.delete('/:id', guidesController.deleteGuide);

module.exports = router;
