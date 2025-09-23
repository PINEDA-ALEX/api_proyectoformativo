const db = require('../../../models');

// Obtener todas las competencias
exports.getAllCompetences = async () => {
    return db.Competence.findAll();
};

// Obtener una competencia por ID
exports.getCompetenceById = async (id) => {
    return db.Competence.findByPk(id);
};

// Crear una nueva competencia
exports.createCompetence = async (competenceData) => {
    return db.Competence.create(competenceData);
};

// Actualizar una competencia existente
exports.updateCompetence = async (id, competenceData) => {
    const competence = await db.Competence.findByPk(id);
    if (!competence) {
        return null;
    }
    await competence.update(competenceData);
    return competence;
};

// Eliminar una competencia
exports.deleteCompetence = async (id) => {
    const competence = await db.Competence.findByPk(id);
    if (!competence) {
        return false;
    }
    await competence.destroy();
    return true;
};