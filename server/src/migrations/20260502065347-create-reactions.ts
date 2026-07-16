'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Reactions', 
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          messagesId:{
            allowNull: false,
            references:{
              model: 'Messages',
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
          emoji: {
            type: DataTypes.STRING
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
        {transaction}
      );
    });
  },
  async down(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.dropTable('Reactions');
  }
};