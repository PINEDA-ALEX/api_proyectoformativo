const db = require('../../../models');

// Obtener todas las técnicas de enseñanza
exports.getAllTeachingtechniques = async () => {
    return db.Teachingtechniques.findAll();
};

// Obtener una técnica de enseñanza por ID
exports.getTeachingtechniqueById = async (id) => {
    return db.Teachingtechniques.findByPk(id);
};

// Crear una nueva técnica de enseñanza
exports.createTeachingtechnique = async (teachingtechniqueData) => {
    return db.Teachingtechniques.create(teachingtechniqueData);
};

// Actualizar una técnica de enseñanza existente
exports.updateTeachingtechnique = async (id, teachingtechniqueData) => {
    const teachingtechnique = await db.Teachingtechniques.findByPk(id);
    if (!teachingtechnique) {
        return null;
    }
    await teachingtechnique.update(teachingtechniqueData);
    return teachingtechnique;
};

// Eliminar una técnica de enseñanza
exports.deleteTeachingtechnique = async (id) => {
    const teachingtechnique = await db.Teachingtechniques.findByPk(id);
    if (!teachingtechnique) {
        return false;
    }
    await teachingtechnique.destroy();
    return true;
};