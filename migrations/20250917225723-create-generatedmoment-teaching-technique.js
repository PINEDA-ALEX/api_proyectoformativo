'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('generatedmoment_teachingTechniques', {
      fkidGeneratedMoment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'generatedMoments', // Asegúrate de que este es el nombre de la tabla de destino
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fkidTeachingTechnique: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'teachingTechniques', // Asegúrate de que este es el nombre de la tabla de destino
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('generatedmoment_teachingTechniques');
  }
};