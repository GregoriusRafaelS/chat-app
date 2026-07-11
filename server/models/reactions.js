'use strict';
const {
  Model
} = require('sequelize');
const messages = require('./messages');
const user = require('./users');
module.exports = (sequelize, DataTypes) => {
  class Reaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reaction.belongsTo(models.Message, {foreignKey: 'messagesId'})
      Reaction.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Reaction.init({
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
        model: 'User',
        key: 'id'
      },
      type: DataTypes.INTEGER
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Reaction',
  });
  return Reaction;
};