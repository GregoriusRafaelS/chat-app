'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Messages', {
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
      senderId:{
        allowNull: false,
        references:{
          model: 'Users',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      replyId:{
        allowNull: true,
        references:{
          model: 'Messages',
          key: 'id'
        },
        type: Sequelize.INTEGER
      },
      content: {
        allowNull: true,
        type: Sequelize.STRING
      },
      mediaUrl: {
        allowNull: true,
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
    await queryInterface.dropTable('Messages');
  }
};