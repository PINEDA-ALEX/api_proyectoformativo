const rolsService = require('../services/roles.service');

// Obtener todos los roles
exports.getAllRols = async (req, res) => {
    try {
        const rols = await rolsService.getAllRols();
        res.status(200).json(rols);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un rol por ID
exports.getRolById = async (req, res) => {
    try {
        const rol = await rolsService.getRolById(req.params.id);
        if (!rol) {
            return res.status(404).json({ message: 'Rol not found' });
        }
        res.status(200).json(rol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo rol
exports.createRol = async (req, res) => {
    try {
        const newRol = await rolsService.createRol(req.body);
        res.status(201).json(newRol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un rol por ID
exports.updateRol = async (req, res) => {
    try {
        const updatedRol = await rolsService.updateRol(req.params.id, req.body);
        if (!updatedRol) {
            return res.status(404).json({ message: 'Rol not found' });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un rol por ID
exports.deleteRol = async (req, res) => {
    try {
        const result = await rolsService.deleteRol(req.params.id);
        if (!result) {
            return res.status(404).json({ message: 'Rol not found' });
        }
        res.status(200).json({ message: 'Rol deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};