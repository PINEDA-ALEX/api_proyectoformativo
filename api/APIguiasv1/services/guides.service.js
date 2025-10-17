const db = require('../../../models');

// Obtener todas las guías
exports.getAllGuides = async () => {
  return await Guide.findAll({
    include: [
      {
        model: Result,
        as: 'learningResults',
        through: { attributes: [] },
      },
    ],
  });
};


// Obtener una guía por ID
exports.getGuideById = async (id) => {
  return await Guide.findByPk(id, {
    include: [
      {
        model: Result,
        as: 'learningResults', // 👈 Debe coincidir con el alias del modelo
        through: { attributes: [] },
      },
    ],
  });
};

// Crear una nueva guía
exports.createGuide = async (guideData) => {
  const { fkidResult, ...guideInfo } = guideData; // Separa los resultados del resto de la info

  // 1️⃣ Crear la guía principal
  const newGuide = await db.Guide.create(guideInfo);

  // 2️⃣ Si vienen resultados seleccionados, crear las relaciones
  if (fkidResult && Array.isArray(fkidResult)) {
    await newGuide.setResults(fkidResult); // Esto crea los registros en 'result_guide'
  }

  // 3️⃣ Retornar la guía creada con las relaciones
  return await db.Guide.findByPk(newGuide.id, { include: db.Result });
};

// Actualizar una guía existente
exports.updateGuide = async (id, guideData) => {
    const guide = await db.Guide.findByPk(id);
    if (!guide) {
        return null;
    }
    await guide.update(guideData);
    return guide;
};

// Eliminar una guía
exports.deleteGuide = async (id) => {
    const guide = await db.Guide.findByPk(id);
    if (!guide) {
        return false;
    }
    await guide.destroy();
    return true;
};