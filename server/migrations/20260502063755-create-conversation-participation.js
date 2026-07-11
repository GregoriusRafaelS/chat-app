'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ConversationParticipations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      conversationId:{
        allowNull: false,
        references:{
          model: 'Conversations',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      userId:{
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.ENUM('Admin', 'Member')
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
    await queryInterface.dropTable('ConversationParticipations');
  }
};