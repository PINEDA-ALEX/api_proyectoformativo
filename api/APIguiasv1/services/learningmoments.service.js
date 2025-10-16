const db = require('../../../models');

// Obtener todos los momentos de aprendizaje CON SUS TÉCNICAS
exports.getAllLearningmoments = async () => {
    return db.learningmoments.findAll({
        include: [{
            model: db.Teachingtechniques,
            as: 'teachingtechniques',
            attributes: ['id', 'name', 'description'],
            through: { attributes: [] } // Oculta campos de tabla pivote
        }]
    });
};

// Obtener un momento de aprendizaje por ID CON SUS TÉCNICAS
exports.getLearningmomentById = async (id) => {
    return db.learningmoments.findByPk(id, {
        include: [{
            model: db.Teachingtechniques,
            as: 'teachingtechniques',
            attributes: ['id', 'name', 'description'],
            through: { attributes: [] }
        }]
    });
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
            await learningmoment.setTeachingtechniques(teachingtechniques, { transaction });
            console.log('Técnicas asociadas exitosamente');
        }

        await transaction.commit();
        console.log('Transacción completada');
        
        // Retornar con las técnicas incluidas
        return db.learningmoments.findByPk(learningmoment.id, {
            include: [{
                model: db.Teachingtechniques,
                as: 'teachingtechniques',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });
    } catch (error) {
        console.error('Error en createLearningmoment:', error);
        await transaction.rollback();
        throw error;
    }
};

// Actualizar un momento de aprendizaje existente (incluyendo técnicas)
exports.updateLearningmoment = async (id, learningmomentData) => {
    const transaction = await db.sequelize.transaction();
    try {
        const learningmoment = await db.learningmoments.findByPk(id);
        if (!learningmoment) {
            return null;
        }

        // Extraer técnicas si vienen en el body
        const { teachingtechniques, tecnicasDidacticas, ...dataToUpdate } = learningmomentData;
        const techniques = teachingtechniques || tecnicasDidacticas;

        // Actualizar datos básicos
        await learningmoment.update(dataToUpdate, { transaction });

        // Si vienen técnicas, actualizarlas
        if (techniques && Array.isArray(techniques)) {
            await learningmoment.setTeachingtechniques(techniques, { transaction });
        }

        await transaction.commit();

        // Retornar con técnicas incluidas
        return db.learningmoments.findByPk(id, {
            include: [{
                model: db.Teachingtechniques,
                as: 'teachingtechniques',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
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

// NUEVO: Actualizar solo las técnicas de un momento
exports.updateLearningmomentTechniques = async (id, techniquesIds) => {
    const transaction = await db.sequelize.transaction();
    try {
        const learningmoment = await db.learningmoments.findByPk(id);
        if (!learningmoment) {
            return null;
        }

        await learningmoment.setTeachingtechniques(techniquesIds, { transaction });
        await transaction.commit();

        return db.learningmoments.findByPk(id, {
            include: [{
                model: db.Teachingtechniques,
                as: 'teachingtechniques',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            }]
        });
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};