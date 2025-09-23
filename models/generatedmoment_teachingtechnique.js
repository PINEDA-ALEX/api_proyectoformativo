'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class generatedmoment_teachingTechnique extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  // Este método se deja vacío para seguir el enfoque de la guía.
}
  }
  generatedmoment_teachingTechnique.init({
    fkidGeneratedMoment: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fkidTeachingTechnique: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'generatedmoment_teachingTechnique',
  });
  return generatedmoment_teachingTechnique;
};