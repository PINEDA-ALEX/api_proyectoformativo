const guidesService = require('../services/guides.service');

// Obtener todas las guías
exports.getAllGuides = async (req, res) => {
    try {
        const guides = await guidesService.getAllGuides();
        res.status(200).json(guides);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una guía por ID
exports.getGuideById = async (req, res) => {
    try {
        const guide = await guidesService.getGuideById(req.params.id);
        if (!guide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        res.status(200).json(guide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva guía
exports.createGuide = async (req, res) => {
    try {
        const newGuide = await guidesService.createGuide(req.body);
        res.status(201).json(newGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una guía por ID
exports.updateGuide = async (req, res) => {
    try {
        const updatedGuide = await guidesService.updateGuide(req.params.id, req.body);
        if (!updatedGuide) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        res.status(200).json(updatedGuide);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una guía por ID
exports.deleteGuide = async (req, res) => {
    try {
        const result = await guidesService.deleteGuide(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Guide not found' });
        }
        res.status(200).json({ message: 'Guide deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};