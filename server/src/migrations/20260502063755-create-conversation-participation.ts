'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'ConversationParticipations', 
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
          userId:{
            allowNull: false,
            references:{
              model: 'Users',
              key: 'id'
            },
            type: DataTypes.INTEGER
          },
          role: {
            type: DataTypes.ENUM('Admin', 'Member')
          },
          createdAt: {
            allowNull: false,
            type: DataTypes.DATE
          },
          updatedAt: {
            allowNull: false,
            type: DataTypes.DATE
          }
        },
        { transaction}
      );
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('ConversationParticipations');
  }
};