const db = require('../../../models');

// Obtener todas las especialidades
exports.getAllSpecialties = async () => {
    return db.Specialty.findAll();
};

// Obtener una especialidad por ID
exports.getSpecialtyById = async (id) => {
    return db.Specialty.findByPk(id);
};

// Crear una nueva especialidad
exports.createSpecialty = async (specialtyData) => {
    return db.Specialty.create(specialtyData);
};

// Actualizar una especialidad existente
exports.updateSpecialty = async (id, specialtyData) => {
    const specialty = await db.Specialty.findByPk(id);
    if (!specialty) {
        return null;
    }
    await specialty.update(specialtyData);
    return specialty;
};

// Eliminar una especialidad
exports.deleteSpecialty = async (id) => {
    const specialty = await db.Specialty.findByPk(id);
    if (!specialty) {
        return false;
    }
    await specialty.destroy();
    return true;
};