const learningmomentsService = require('../services/learningmoments.service');

// Obtener todos los momentos de aprendizaje
exports.getAllLearningmoments = async (req, res) => {
    try {
        const learningmoments = await learningmomentsService.getAllLearningmoments();
        res.status(200).json(learningmoments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un momento de aprendizaje por ID
exports.getLearningmomentById = async (req, res) => {
    try {
        const learningmoment = await learningmomentsService.getLearningmomentById(req.params.id);
        if (!learningmoment) {
            return res.status(404).json({ message: 'Learning moment not found' });
        }
        res.status(200).json(learningmoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo momento de aprendizaje
exports.createLearningmoment = async (req, res) => {
    try {
        const { teachingtechniques, ...learningMomentData } = req.body;
        const newLearningmoment = await learningmomentsService.createLearningmoment(learningMomentData, teachingtechniques);
        res.status(201).json(newLearningmoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un momento de aprendizaje por ID
exports.updateLearningmoment = async (req, res) => {
    try {
        const updatedLearningmoment = await learningmomentsService.updateLearningmoment(req.params.id, req.body);
        if (!updatedLearningmoment) {
            return res.status(404).json({ message: 'Learning moment not found' });
        }
        res.status(200).json(updatedLearningmoment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un momento de aprendizaje por ID
exports.deleteLearningmoment = async (req, res) => {
    try {
        const result = await learningmomentsService.deleteLearningmoment(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Learning moment not found' });
        }
        res.status(200).json({ message: 'Learning moment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};