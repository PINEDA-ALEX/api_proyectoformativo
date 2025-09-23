'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('learningmoments_teachingtechniques', {
      fkidLearningMoment: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'learningMoments',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fkidTeachingTechnique: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'teachingTechniques',
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
    await queryInterface.dropTable('learningmoments_teachingtechniques');
  }
};