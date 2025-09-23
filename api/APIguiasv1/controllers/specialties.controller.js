const specialtiesService = require('../services/specialties.service');

// Obtener todas las especialidades
exports.getAllSpecialties = async (req, res) => {
    try {
        const specialties = await specialtiesService.getAllSpecialties();
        res.status(200).json(specialties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una especialidad por ID
exports.getSpecialtyById = async (req, res) => {
    try {
        const specialty = await specialtiesService.getSpecialtyById(req.params.id);
        if (!specialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.status(200).json(specialty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva especialidad
exports.createSpecialty = async (req, res) => {
    try {
        const newSpecialty = await specialtiesService.createSpecialty(req.body);
        res.status(201).json(newSpecialty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una especialidad por ID
exports.updateSpecialty = async (req, res) => {
    try {
        const updatedSpecialty = await specialtiesService.updateSpecialty(req.params.id, req.body);
        if (!updatedSpecialty) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.status(200).json(updatedSpecialty);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una especialidad por ID
exports.deleteSpecialty = async (req, res) => {
    try {
        const result = await specialtiesService.deleteSpecialty(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Specialty not found' });
        }
        res.status(200).json({ message: 'Specialty deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};