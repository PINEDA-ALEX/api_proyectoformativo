'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class result_guide extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Este método se deja vacío porque la tabla 'result_guide' es
      // una tabla de unión pura. Las asociaciones de muchos a muchos
      // se definen en los modelos de las entidades principales (Guia y Resultado).
    }
  }
  result_guide.init({
    fkidGuide: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    fkidResult: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'result_guide',
    // Aquí puedes incluir otras opciones del modelo si las necesitas
    // por ejemplo, para indicar que no debe usar un ID predeterminado.
    // Aunque si las claves foráneas son la clave primaria, esto no es necesario.
  });
  return result_guide;
};