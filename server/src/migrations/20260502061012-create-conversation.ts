'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Conversations', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          profilePicture: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          type: {
            type: DataTypes.ENUM('Group', 'Personal'),
            allowNull: false,
            defaultValue: 'Personal'
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
    await queryInterface.dropTable('Conversations');
  }
};