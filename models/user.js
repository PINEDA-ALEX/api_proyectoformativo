'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt'); // Importamos la librería Bcrypt

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Método para definir asociaciones
     */
    static associate(models) {
      // Relación con Rols (N usuarios → 1 rol)
      this.belongsTo(models.Rols, { foreignKey: 'fkidRole' });

      // Relación con Specialty (N usuarios → 1 especialidad)
      this.belongsTo(models.Specialty, { foreignKey: 'fkidSpecialty' });

      // Relación con Guide (1 usuario → muchas guías)
      this.hasMany(models.Guide, { foreignKey: 'fkidUser' });
    }
    
    // Método para comparar contraseñas
    validPassword(password) {
      return bcrypt.compareSync(password, this.password);
    }
  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true // Aseguramos que el email sea único
    },
    phone: DataTypes.STRING,
    fkidSpecialty: DataTypes.INTEGER,
    fkidRole: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: async (user) => {
        // Encriptamos la contraseña antes de guardar el usuario por primera vez
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async (user) => {
        // Encriptamos la contraseña si se actualiza
        if (user.changed('password')) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  return User;
};