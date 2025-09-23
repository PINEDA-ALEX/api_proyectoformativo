'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Guides', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      presentation: {
        type: Sequelize.TEXT
      },
      glossaryTerms: {
        type: Sequelize.TEXT
      },
      bibliographicReferences: {
        type: Sequelize.TEXT
      },
      creationDate: {
        type: Sequelize.DATE
      },
      updateDate: {
        type: Sequelize.DATE
      },
      changeReason: {
        type: Sequelize.STRING
      },
      //aca grego los nevos campos
      projectPhase: {
        type: Sequelize.STRING
      },
      projectActivity: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      learningActivities: {
        type: Sequelize.TEXT
      },
      initialReflection: {
        type: Sequelize.TEXT
      },
      contextualizationActivity: {
        type: Sequelize.TEXT
      },
      knowledgeActivity: {
        type: Sequelize.TEXT
      },
      environment: {
        type: Sequelize.TEXT
      },
      materials: {
        type: Sequelize.TEXT
      },
      knowledgeEvidence: {
        type: Sequelize.TEXT
      },
      performanceEvidence: {
        type: Sequelize.TEXT
      },
      productEvidence: {
        type: Sequelize.TEXT
      },
      criterion: {
        type: Sequelize.TEXT
      },
      evaluationTechniques: {
        type: Sequelize.TEXT
      },

      //aca terminanuevos campos
      fkidUser: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fkidTrainingProgram: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Trainigprograms',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      fkidSpecialty: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Specialties',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      wordFile: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Guides');
  }
};