const db = require('../../../models');

// Obtener todos los resultados
exports.getAllResults = async () => {
    return db.Result.findAll();
};

// Obtener un resultado por ID
exports.getResultById = async (id) => {
    return db.Result.findByPk(id);
};

// Crear un nuevo resultado
exports.createResult = async (resultData, guides) => {
    const transaction = await db.sequelize.transaction();
    try {
        const result = await db.Result.create(resultData, { transaction });

        if (guides && guides.length > 0) {
            await result.addGuides(guides, { transaction });
        }

        await transaction.commit();
        return result;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Actualizar un resultado existente
exports.updateResult = async (id, resultData) => {
    const result = await db.Result.findByPk(id);
    if (!result) {
        return null;
    }
    await result.update(resultData);
    return result;
};

// Eliminar un resultado
exports.deleteResult = async (id) => {
    const result = await db.Result.findByPk(id);
    if (!result) {
        return false;
    }
    await result.destroy();
    return true;
};