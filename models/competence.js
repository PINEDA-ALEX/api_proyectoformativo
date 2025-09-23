'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Competence extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // competence.js
static associate(models) {
  // Relación con TrainingProgram (N competencias → 1 programa)
  this.belongsTo(models.Trainigprogram, { foreignKey: 'fkidTrainingProgram' });

  // Relación con Result (1 competencia → muchos resultados)
  this.hasMany(models.Result, { foreignKey: 'fkidCompetence' });
}

  }
  Competence.init({
    name: DataTypes.STRING,
    fkidTrainingProgram: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Competence',
  });
  return Competence;
};