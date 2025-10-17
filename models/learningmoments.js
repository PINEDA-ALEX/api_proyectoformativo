'use strict';
const {
  Model
} = require('sequelize');
const { DESCRIBE } = require('sequelize/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class learningmoments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // learningMoment.js
// learningmoments.js
// ...
static associate(models) {
  // Relación N:M con Teachingtechnique
  this.belongsToMany(models.Teachingtechniques, { 
    through: models.learningmoments_teachingtechniques, 
    foreignKey: 'fkidLearningMoment',
    otherKey: 'fkidTeachingTechnique',
    as: 'teachingtechniques' // Agrega este alias para acortar el nombre
  });

  // Relación con GeneratedMoment
  this.hasMany(models.Generatedmoment, { foreignKey: 'fkidLearningMoments' });
}
// ...
  }
  learningmoments.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING(1000)
    
  }, {
    sequelize,
    modelName: 'learningmoments',
  });
  return learningmoments;
};