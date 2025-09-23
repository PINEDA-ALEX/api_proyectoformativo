const trainigprogramsService = require('../services/trainigprograms.service');

// Obtener todos los programas de formación
exports.getAllTrainigprograms = async (req, res) => {
    try {
        const trainigprograms = await trainigprogramsService.getAllTrainigprograms();
        res.status(200).json(trainigprograms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un programa de formación por ID
exports.getTrainigprogramById = async (req, res) => {
    try {
        const trainigprogram = await trainigprogramsService.getTrainigprogramById(req.params.id);
        if (!trainigprogram) {
            return res.status(404).json({ message: 'Training program not found' });
        }
        res.status(200).json(trainigprogram);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo programa de formación
exports.createTrainigprogram = async (req, res) => {
    try {
        const newTrainigprogram = await trainigprogramsService.createTrainigprogram(req.body);
        res.status(201).json(newTrainigprogram);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un programa de formación por ID
exports.updateTrainigprogram = async (req, res) => {
    try {
        const updatedTrainigprogram = await trainigprogramsService.updateTrainigprogram(req.params.id, req.body);
        if (!updatedTrainigprogram) {
            return res.status(404).json({ message: 'Training program not found' });
        }
        res.status(200).json(updatedTrainigprogram);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un programa de formación por ID
exports.deleteTrainigprogram = async (req, res) => {
    try {
        const result = await trainigprogramsService.deleteTrainigprogram(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Training program not found' });
        }
        res.status(200).json({ message: 'Training program deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};