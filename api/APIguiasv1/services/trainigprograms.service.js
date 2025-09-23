const db = require('../../../models');

// Obtener todos los programas de formación
exports.getAllTrainigprograms = async () => {
    return db.Trainigprogram.findAll();
};

// Obtener un programa de formación por ID
exports.getTrainigprogramById = async (id) => {
    return db.Trainigprogram.findByPk(id);
};

// Crear un nuevo programa de formación
exports.createTrainigprogram = async (trainigprogramData) => {
    return db.Trainigprogram.create(trainigprogramData);
};

// Actualizar un programa de formación existente
exports.updateTrainigprogram = async (id, trainigprogramData) => {
    const trainigprogram = await db.Trainigprogram.findByPk(id);
    if (!trainigprogram) {
        return null;
    }
    await trainigprogram.update(trainigprogramData);
    return trainigprogram;
};

// Eliminar un programa de formación
exports.deleteTrainigprogram = async (id) => {
    const trainigprogram = await db.Trainigprogram.findByPk(id);
    if (!trainigprogram) {
        return false;
    }
    await trainigprogram.destroy();
    return true;
};