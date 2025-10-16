'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('result_guide', {
      fkidGuide: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'guides',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      fkidResult: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'results',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('result_guide');
  }
};