const generatedmomentsService = require('../services/generatedmoments.service');

// Obtener todos los momentos generados
exports.getAllGeneratedmoments = async (req, res) => {
    try {
        const generatedmoments = await generatedmomentsService.getAllGeneratedmoments();
        res.status(200).json(generatedmoments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un momento generado por ID
exports.getGeneratedmomentById = async (req, res) => {
    try {
        const generatedmoment = await generatedmomentsService.getGeneratedmomentById(req.params.id);
        if (!generatedmoment) {
            return res.status(404).json({ message: 'Generated moment not found' });
        }
        res.status(200).json(generatedmoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo momento generado
exports.createGeneratedmoment = async (req, res) => {
    try {
        const { teachingTechniques, ...generatedMomentData } = req.body;
        const newGeneratedMoment = await generatedmomentsService.createGeneratedmoment(generatedMomentData, teachingTechniques);
        res.status(201).json(newGeneratedMoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un momento generado por ID
exports.updateGeneratedmoment = async (req, res) => {
    try {
        const updatedGeneratedMoment = await generatedmomentsService.updateGeneratedmoment(req.params.id, req.body);
        if (!updatedGeneratedMoment) {
            return res.status(404).json({ message: 'Generated moment not found' });
        }
        res.status(200).json(updatedGeneratedMoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un momento generado por ID
exports.deleteGeneratedmoment = async (req, res) => {
    try {
        const result = await generatedmomentsService.deleteGeneratedmoment(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Generated moment not found' });
        }
        res.status(200).json({ message: 'Generated moment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};