const db = require('../../../models');

// Obtener todas las guías
exports.getAllGuides = async () => {
    return db.Guide.findAll();
};

// Obtener una guía por ID
exports.getGuideById = async (id) => {
    return db.Guide.findByPk(id);
};

// Crear una nueva guía
exports.createGuide = async (guideData) => {
    return db.Guide.create(guideData);
};

// Actualizar una guía existente
exports.updateGuide = async (id, guideData) => {
    const guide = await db.Guide.findByPk(id);
    if (!guide) {
        return null;
    }
    await guide.update(guideData);
    return guide;
};

// Eliminar una guía
exports.deleteGuide = async (id) => {
    const guide = await db.Guide.findByPk(id);
    if (!guide) {
        return false;
    }
    await guide.destroy();
    return true;
};