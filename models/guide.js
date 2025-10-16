'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
  // Relación con User (N guías → 1 usuario)
  this.belongsTo(models.User, { foreignKey: 'fkidUser' });

  // Relación con Trainingprogram (N guías → 1 programa de formación)
  this.belongsTo(models.Trainigprogram, { foreignKey: 'fkidTrainingProgram' });

  // Relación con Specialty (N guías → 1 especialidad)
  this.belongsTo(models.Specialty, { foreignKey: 'fkidSpecialty' });

  // Relación N:M con Result a través de la tabla de unión result_guide
  this.belongsToMany(models.Result, { through: 'result_guide', foreignKey: 'fkidGuide' });

  // Relación con Generatedmoment (1 guía → muchos momentos generados)
  this.hasMany(models.Generatedmoment, { foreignKey: 'fkidGuide' });
}
  }
  Guide.init({
    name: DataTypes.STRING,
    presentation: DataTypes.TEXT,
    glossaryTerms: DataTypes.TEXT,
    bibliographicReferences: DataTypes.TEXT,
    creationDate: DataTypes.DATE,
    updateDate: DataTypes.DATE,
    changeReason: DataTypes.STRING,
    //aca grego los nevos campos
    projectPhase: DataTypes.STRING,
    projectActivity: DataTypes.STRING,
    duration: DataTypes.STRING,
    learningActivities: DataTypes.TEXT,
    initialReflection: DataTypes.TEXT,
    contextualizationActivity: DataTypes.TEXT,
    knowledgeActivity: DataTypes.TEXT,
    environment: DataTypes.TEXT,
    materials: DataTypes.TEXT,
    knowledgeEvidence: DataTypes.TEXT,
    performanceEvidence: DataTypes.TEXT,
    productEvidence: DataTypes.TEXT,
    criterion: DataTypes.TEXT,
    evaluationTechniques: DataTypes.TEXT,
    transferactivity: DataTypes.TEXT, 
    //campos nuevos
    fkidUser: DataTypes.INTEGER,
    fkidTrainingProgram: DataTypes.INTEGER,
    fkidSpecialty: DataTypes.INTEGER,
    wordFile: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Guide',
  });
  return Guide;
};