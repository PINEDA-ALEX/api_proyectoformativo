const db = require('../../../models');

// Obtener todos los momentos generados
exports.getAllGeneratedmoments = async () => {
    return db.Generatedmoment.findAll();
};

// Obtener un momento generado por ID
exports.getGeneratedmomentById = async (id) => {
    return db.Generatedmoment.findByPk(id);
};

// Crear un nuevo momento generado
exports.createGeneratedmoment = async (generatedMomentData, teachingTechniques) => {
    const transaction = await db.sequelize.transaction();
    try {
        const generatedMoment = await db.Generatedmoment.create(generatedMomentData, { transaction });

        if (teachingTechniques && teachingTechniques.length > 0) {
            await generatedMoment.addTeachingtechniques(teachingTechniques, { transaction });
        }

        await transaction.commit();
        return generatedMoment;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Actualizar un momento generado existente
exports.updateGeneratedmoment = async (id, generatedMomentData) => {
    const generatedMoment = await db.Generatedmoment.findByPk(id);
    if (!generatedMoment) {
        return null;
    }
    await generatedMoment.update(generatedMomentData);
    return generatedMoment;
};

// Eliminar un momento generado
exports.deleteGeneratedmoment = async (id) => {
    const generatedMoment = await db.Generatedmoment.findByPk(id);
    if (!generatedMoment) {
        return false;
    }
    await generatedMoment.destroy();
    return true;
};