const db = require('../../../models');

// Obtener todos los momentos de aprendizaje
exports.getAllLearningmoments = async () => {
    return db.learningmoments.findAll();
};

// Obtener un momento de aprendizaje por ID
exports.getLearningmomentById = async (id) => {
    return db.learningmoments.findByPk(id);
};

// Obtener las técnicas didácticas de un momento específico
exports.getLearningmomentTechniques = async (id) => {
    const learningMoment = await db.learningmoments.findByPk(id, {
        include: [{
            model: db.Teachingtechniques,
            through: { attributes: [] },
            as: 'teachingtechniques'
        }]
    });

    if (!learningMoment) {
        throw new Error('Learning moment not found');
    }

    return learningMoment.teachingtechniques || [];
};

// Crear un nuevo momento de aprendizaje
exports.createLearningmoment = async (learningMomentData, teachingtechniques) => {
    const transaction = await db.sequelize.transaction();
    try {
        const learningmoment = await db.learningmoments.create(learningMomentData, { transaction });

        if (teachingtechniques && teachingtechniques.length > 0) {
            // Asegúrate de que teachingtechniques sea un array de números
            const techniqueIds = Array.isArray(teachingtechniques) ? teachingtechniques : [teachingtechniques];
            await learningmoment.addTeachingtechniques(techniqueIds, { transaction });
        }

        await transaction.commit();
        
        // Retorna el momento con las técnicas asociadas
        return db.learningmoments.findByPk(learningmoment.id, {
            include: [{
                model: db.Teachingtechniques,
                through: { attributes: [] },
                as: 'teachingtechniques'
            }]
        });
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