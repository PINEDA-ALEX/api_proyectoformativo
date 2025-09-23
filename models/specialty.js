'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Specialty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // specialty.js
static associate(models) {
  // Relación con User (1 especialidad → muchos usuarios)
  this.hasMany(models.User, { foreignKey: 'fkidSpecialty' });

  // Relación con Guide (1 especialidad → muchas guías)
  this.hasMany(models.Guide, { foreignKey: 'fkidSpecialty' });
}

  }
  Specialty.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Specialty',
  });
  return Specialty;
};