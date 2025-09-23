const db = require('../../../models');

// Obtener todos los roles
exports.getAllRols = async () => {
    return db.Rols.findAll();
};

// Obtener un rol por ID
exports.getRolById = async (id) => {
    return db.Rols.findByPk(id);
};

// Crear un nuevo rol
exports.createRol = async (rolData) => {
    return db.Rols.create(rolData);
};

// Actualizar un rol existente
exports.updateRol = async (id, rolData) => {
    const rol = await db.Rols.findByPk(id);
    if (!rol) {
        return null;
    }
    await rol.update(rolData);
    return rol;
};

// Eliminar un rol
exports.deleteRol = async (id) => {
    const rol = await db.Rols.findByPk(id);
    if (!rol) {
        return false;
    }
    await rol.destroy();
    return true;
};