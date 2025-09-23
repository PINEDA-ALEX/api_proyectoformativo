const express = require('express');
const router = express.Router();
const guidesController = require('../controllers/guides.controller');

// Obtener todas las guías
router.get('/', guidesController.getAllGuides);

// Obtener una guía por ID
router.get('/:id', guidesController.getGuideById);

// Crear una nueva guía
router.post('/', guidesController.createGuide);

// Actualizar una guía por ID
router.put('/:id', guidesController.updateGuide);

// Eliminar una guía por ID
router.delete('/:id', guidesController.deleteGuide);

module.exports = router;