// guides.service.js
const db = require('../../../models'); // db.Guide, db.Result, etc.

const includeLearningResults = [
  {
    model: db.Result,
    as: 'learningResults', // debe coincidir con el alias en Guide.belongsToMany(...)
    through: { attributes: [] },
  },
];

// Obtener todas las guías (incluye solo los resultados asociados)
exports.getAllGuides = async () => {
  return await db.Guide.findAll({
    include: [
      ...includeLearningResults,
      // si quieres incluir otros modelos (User, Specialty, Trainigprogram), agrégalos aquí
    ],
  });
};

// Obtener una guía por ID (incluye solo los resultados asociados)
exports.getGuideById = async (id) => {
  return await db.Guide.findByPk(id, {
    include: [
      ...includeLearningResults,
      // otros includes opcionales
    ],
  });
};

// Crear una nueva guía. Firma: createGuide(guideData, results)
// results: array de IDs (opcional)
exports.createGuide = async (guideData, results = []) => {
  const transaction = await db.sequelize.transaction();
  try {
    // guideData contiene campos de la guía (sin results)
    const newGuide = await db.Guide.create(guideData, { transaction });

    if (results && Array.isArray(results) && results.length > 0) {
      // Uso del setter con el alias -> setLearningResults
      // Sequelize generará setLearningResults si usaste as: 'learningResults'
      await newGuide.setLearningResults(results, { transaction });
    }

    await transaction.commit();

    // devolver la guía creada con los resultados asociados (si los hay)
    return await db.Guide.findByPk(newGuide.id, {
      include: includeLearningResults,
    });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Actualizar una guía completa. Si vienen resultados en el body (learningResults / fkidResult / resultadosAprendizaje), los actualiza también.
exports.updateGuide = async (id, guideData) => {
  const transaction = await db.sequelize.transaction();
  try {
    const guide = await db.Guide.findByPk(id, { transaction });
    if (!guide) {
      await transaction.rollback();
      return null;
    }

    // Extraer potenciales resultados del body sin mutar guideData
    const { learningResults, resultadosAprendizaje, fkidResult, ...rest } = guideData;
    const resultsArray = learningResults || resultadosAprendizaje || fkidResult || null;

    // Actualizar campos de la guía
    await guide.update(rest, { transaction });

    // Si se envió un array de resultados, actualizar la relación
    if (resultsArray !== null) {
      if (!Array.isArray(resultsArray)) {
        await transaction.rollback();
        throw new Error('Los resultados deben ser un array de IDs');
      }
      await guide.setLearningResults(resultsArray, { transaction });
    }

    await transaction.commit();

    return await db.Guide.findByPk(id, { include: includeLearningResults });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Actualizar solo los resultados de aprendizaje de una guía (ruta específica)
exports.updateGuideResults = async (id, results) => {
  const transaction = await db.sequelize.transaction();
  try {
    const guide = await db.Guide.findByPk(id, { transaction });
    if (!guide) {
      await transaction.rollback();
      return null;
    }

    if (!Array.isArray(results)) {
      await transaction.rollback();
      throw new Error('Se requiere un array de IDs de resultados');
    }

    await guide.setLearningResults(results, { transaction });
    await transaction.commit();

    return await db.Guide.findByPk(id, { include: includeLearningResults });
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

// Eliminar una guía
exports.deleteGuide = async (id) => {
  const guide = await db.Guide.findByPk(id);
  if (!guide) return false;
  await guide.destroy();
  return true;
};
