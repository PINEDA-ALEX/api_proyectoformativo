const competencesService = require('../services/competences.service');

// Obtener todas las competencias
exports.getAllCompetences = async (req, res) => {
    try {
        const competences = await competencesService.getAllCompetences();
        res.status(200).json(competences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una competencia por ID
exports.getCompetenceById = async (req, res) => {
    try {
        const competence = await competencesService.getCompetenceById(req.params.id);
        if (!competence) {
            return res.status(404).json({ message: 'Competence not found' });
        }
        res.status(200).json(competence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva competencia
exports.createCompetence = async (req, res) => {
    try {
        const newCompetence = await competencesService.createCompetence(req.body);
        res.status(201).json(newCompetence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una competencia por ID
exports.updateCompetence = async (req, res) => {
    try {
        const updatedCompetence = await competencesService.updateCompetence(req.params.id, req.body);
        if (!updatedCompetence) {
            return res.status(404).json({ message: 'Competence not found' });
        }
        res.status(200).json(updatedCompetence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una competencia por ID
exports.deleteCompetence = async (req, res) => {
    try {
        const result = await competencesService.deleteCompetence(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Competence not found' });
        }
        res.status(200).json({ message: 'Competence deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};