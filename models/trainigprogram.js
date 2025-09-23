'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainigprogram extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // trainingProgram.js
static associate(models) {
  // Relación con Competence (1 programa → muchas competencias)
  this.hasMany(models.Competence, { foreignKey: 'fkidTrainingProgram' });

  // Relación con Guide (1 programa → muchas guías)
  this.hasMany(models.Guide, { foreignKey: 'fkidTrainingProgram' });
}

  }
  Trainigprogram.init({
    name: DataTypes.STRING,
    trainingprogramcode: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainigprogram',
  });
  return Trainigprogram;
};