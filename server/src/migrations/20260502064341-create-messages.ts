'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Messages', 
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          conversationId:{
            allowNull: false,
            references:{
              model: 'Conversations',
              key: 'id'
            },
            type: DataTypes.INTEGER
          },
          senderId:{
            allowNull: false,
            references:{
              model: 'Users',
              key: 'id'
            },
            type: DataTypes.INTEGER
          },
          replyId:{
            allowNull: true,
            references:{
              model: 'Messages',
              key: 'id'
            },
            type: DataTypes.INTEGER
          },
          content: {
            allowNull: true,
            type: DataTypes.STRING
          },
          mediaUrl: {
            allowNull: true,
            type: DataTypes.STRING
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
        },
        {transaction},
      );
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('Messages');
  }
};