const teachingtechniquesService = require('../services/teachingtechniques.service');

// Obtener todas las técnicas de enseñanza
exports.getAllTeachingtechniques = async (req, res) => {
    try {
        const teachingtechniques = await teachingtechniquesService.getAllTeachingtechniques();
        res.status(200).json(teachingtechniques);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una técnica de enseñanza por ID
exports.getTeachingtechniqueById = async (req, res) => {
    try {
        const teachingtechnique = await teachingtechniquesService.getTeachingtechniqueById(req.params.id);
        if (!teachingtechnique) {
            return res.status(404).json({ message: 'Teaching technique not found' });
        }
        res.status(200).json(teachingtechnique);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva técnica de enseñanza
exports.createTeachingtechnique = async (req, res) => {
    try {
        const newTeachingtechnique = await teachingtechniquesService.createTeachingtechnique(req.body);
        res.status(201).json(newTeachingtechnique);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una técnica de enseñanza por ID
exports.updateTeachingtechnique = async (req, res) => {
    try {
        const updatedTeachingtechnique = await teachingtechniquesService.updateTeachingtechnique(req.params.id, req.body);
        if (!updatedTeachingtechnique) {
            return res.status(404).json({ message: 'Teaching technique not found' });
        }
        res.status(200).json(updatedTeachingtechnique);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una técnica de enseñanza por ID
exports.deleteTeachingtechnique = async (req, res) => {
    try {
        const result = await teachingtechniquesService.deleteTeachingtechnique(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Teaching technique not found' });
        }
        res.status(200).json({ message: 'Teaching technique deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};