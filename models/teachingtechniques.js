'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Teachingtechniques extends Model {
    static associate(models) {
      // Relación N:M con Learningmoments
      this.belongsToMany(models.learningmoments, {
        through: models.learningmoments_teachingtechniques,  // Modelo
        foreignKey: 'fkidTeachingTechnique',
        otherKey: 'fkidLearningMoment',  // Agregar esto
        as: 'learningmoments'  // Agregar alias
      });

      // Relación N:M con Generatedmoment
      // Pasa el objeto del modelo 'generatedmoment_teachingTechnique' en lugar del string
      this.belongsToMany(models.Generatedmoment, {
        through: models.generatedmoment_teachingTechnique,
        foreignKey: 'fkidTeachingTechnique',
        otherKey: 'fkidGeneratedMoment' // Define la otra clave
      });
    }
  }
  Teachingtechniques.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(500)
  }, {
    sequelize,
    modelName: 'Teachingtechniques',
  });
  return Teachingtechniques;
};