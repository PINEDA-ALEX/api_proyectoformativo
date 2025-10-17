const guidesService = require('../services/guides.service');

// Obtener todas las guías
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await guidesService.getAllGuides();
    res.status(200).json(guides);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener una guía por ID
exports.getGuideById = async (req, res) => {
  try {
    const guide = await guidesService.getGuideById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json(guide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Obtener los resultados de aprendizaje de una guía específica
exports.getGuideResults = async (req, res) => {
  try {
    const results = await guidesService.getGuideResults(req.params.id);
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear una nueva guía (incluye resultados si vienen en el body)
exports.createGuide = async (req, res) => {
  try {
    const { resultadosAprendizaje, learningResults, ...guideData } = req.body;
    const results = resultadosAprendizaje || learningResults || [];
    const newGuide = await guidesService.createGuide(guideData, results);
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Actualizar una guía completa
exports.updateGuide = async (req, res) => {
  try {
    const updatedGuide = await guidesService.updateGuide(req.params.id, req.body);
    if (!updatedGuide) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Actualizar solo los resultados de aprendizaje de una guía
exports.updateGuideResults = async (req, res) => {
  try {
    const { resultsIds, resultadosAprendizaje, learningResults } = req.body;
    const results = resultsIds || resultadosAprendizaje || learningResults;

    if (!results || !Array.isArray(results)) {
      return res.status(400).json({
        message: 'Se requiere un array de IDs de resultados (resultsIds, resultadosAprendizaje o learningResults)',
      });
    }

    const updatedGuide = await guidesService.updateGuideResults(req.params.id, results);

    if (!updatedGuide) {
      return res.status(404).json({ message: 'Guide not found' });
    }

    res.status(200).json(updatedGuide);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar una guía por ID
exports.deleteGuide = async (req, res) => {
  try {
    const result = await guidesService.deleteGuide(req.params.id);
    if (!result) {
      return res.status(404).json({ message: 'Guide not found' });
    }
    res.status(200).json({ message: 'Guide deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
