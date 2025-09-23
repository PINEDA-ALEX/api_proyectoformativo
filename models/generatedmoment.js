'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Generatedmoment extends Model {
    static associate(models) {
      // Relación con LearningMoment
      this.belongsTo(models.learningmoments, { foreignKey: 'fkidLearningMoments' });

      // Relación N:M con Teachingtechniques
      // Pasa el objeto del modelo 'generatedmoment_teachingTechnique' en lugar del string
      this.belongsToMany(models.Teachingtechniques, { 
        through: models.generatedmoment_teachingTechnique, 
        foreignKey: 'fkidGeneratedMoment',
        otherKey: 'fkidTeachingTechnique' // Define la otra clave
      });
    }
  }
  Generatedmoment.init({
    generatedText: DataTypes.TEXT,
    fkidGuide: DataTypes.INTEGER,
    fkidLearningMoments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Generatedmoment',
  });
  return Generatedmoment;
};