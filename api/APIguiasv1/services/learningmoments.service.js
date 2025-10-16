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
        console.log('Creando momento con datos:', learningMomentData);
        console.log('Técnicas recibidas:', teachingtechniques);

        const learningmoment = await db.learningmoments.create(learningMomentData, { transaction });
        console.log('Momento creado con ID:', learningmoment.id);

        if (teachingtechniques && Array.isArray(teachingtechniques) && teachingtechniques.length > 0) {
            console.log('Asociando técnicas:', teachingtechniques);
            await learningmoment.addTeachingtechniques(teachingtechniques, { transaction });
            console.log('Técnicas asociadas exitosamente');
        }

        await transaction.commit();
        console.log('Transacción completada');
        
        // Retorna el momento sin incluir las relaciones para evitar problemas
        return learningmoment;
    } catch (error) {
        console.error('Error en createLearningmoment:', error);
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