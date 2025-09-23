const resultsService = require('../services/results.service');

// Obtener todos los resultados
exports.getAllResults = async (req, res) => {
    try {
        const results = await resultsService.getAllResults();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un resultado por ID
exports.getResultById = async (req, res) => {
    try {
        const result = await resultsService.getResultById(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo resultado
exports.createResult = async (req, res) => {
    try {
        const { guides, ...resultData } = req.body;
        const newResult = await resultsService.createResult(resultData, guides);
        res.status(201).json(newResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un resultado por ID
exports.updateResult = async (req, res) => {
    try {
        const updatedResult = await resultsService.updateResult(req.params.id, req.body);
        if (!updatedResult) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json(updatedResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un resultado por ID
exports.deleteResult = async (req, res) => {
    try {
        const result = await resultsService.deleteResult(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Result not found' });
        }
        res.status(200).json({ message: 'Result deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};