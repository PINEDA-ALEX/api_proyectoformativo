'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // result.js
static associate(models) {
  // Relación con Competence (N resultados → 1 competencia)
  this.belongsTo(models.Competence, { foreignKey: 'fkidCompetence' });

  // Relación N:M con Guide a través de la tabla de unión result_guide
  this.belongsToMany(models.Guide, { through: 'result_guide', foreignKey: 'fkidResult' });
}
  }
  Result.init({
    fkidCompetence: DataTypes.INTEGER,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};