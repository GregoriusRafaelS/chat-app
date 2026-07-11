'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Conversation, {foreignKey: 'conversationId'})
      Message.belongsTo(models.User, {foreignKey: 'senderId'})
      Message.hasMany(models.Reaction, {foreignKey: 'messageId'})
    }
  }
  Message.init({
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference:{
        model: 'Converasation',
        key: 'id'
      },
    },
    senderId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      reference:{
        model: 'User',
        key: 'id'
      },
    },
    replyId:{
      allowNull:true,
      type: DataTypes.INTEGER,
      reference:{
        model: 'Message',
        key: 'id'
      },
    },
    content: {
      type: DataTypes.STRING,
      allowNull: true
    },
    mediaUrl:{
      type: DataTypes.STRING,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('User', 'System'),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Message',
  });
  return Message;
};