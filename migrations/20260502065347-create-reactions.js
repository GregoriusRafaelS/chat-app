'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      messagesId:{
        allowNull: false,
        references:{
          model: 'Messages',
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
      emoji: {
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
    await queryInterface.dropTable('Reactions');
  }
};