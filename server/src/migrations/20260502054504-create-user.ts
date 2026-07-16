'use strict';
import { QueryInterface, DataTypes } from "sequelize";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface: QueryInterface): Promise<void> {
    await queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable(
        'Users', {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
          },
          fullName: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          profilePicture: {
            type: DataTypes.TEXT,
            allowNull: true,
          },
          email: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false
          },
          verified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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
    await queryInterface.dropTable('Users');
  }
};