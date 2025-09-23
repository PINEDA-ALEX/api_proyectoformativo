'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class learningmoments_teachingtechniques extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Como esta es una tabla de unión pura, este método se deja vacío.
    }
  }
  learningmoments_teachingtechniques.init({
    fkidLearningMoment: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fkidTeachingTechnique: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'learningmoments_teachingtechniques',
  });
  return learningmoments_teachingtechniques;
};