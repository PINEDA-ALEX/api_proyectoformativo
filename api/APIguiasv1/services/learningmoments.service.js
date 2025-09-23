const db = require('../../../models');

// Obtener todos los momentos de aprendizaje
exports.getAllLearningmoments = async () => {
    return db.learningmoments.findAll();
};

// Obtener un momento de aprendizaje por ID
exports.getLearningmomentById = async (id) => {
    return db.learningmoments.findByPk(id);
};

// Crear un nuevo momento de aprendizaje
exports.createLearningmoment = async (learningMomentData, teachingtechniques) => {
    const transaction = await db.sequelize.transaction();
    try {
        const learningmoment = await db.learningmoments.create(learningMomentData, { transaction });

        if (teachingtechniques && teachingtechniques.length > 0) {
            await learningmoment.addTeachingtechniques(teachingtechniques, { transaction });
        }

        await transaction.commit();
        return learningmoment;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Actualizar un momento de aprendizaje existente
exports.updateLearningmoment = async (id, learningmomentData) => {
    const learningmoment = await db.learningmoments.findByPk(id);
    if (!learningmoment) {
        return null;
    }
    await learningmoment.update(learningmomentData);
    return learningmoment;
};

// Eliminar un momento de aprendizaje
exports.deleteLearningmoment = async (id) => {
    const learningmoment = await db.learningmoments.findByPk(id);
    if (!learningmoment) {
        return false;
    }
    await learningmoment.destroy();
    return true;
};