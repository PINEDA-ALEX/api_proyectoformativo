'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rols extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // role.js
static associate(models) {
  // Relación con User (1 rol → muchos usuarios)
  this.hasMany(models.User, { foreignKey: 'fkidRole' });
}

  }
  Rols.init({
    nameRol: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Rols',
  });
  return Rols;
};