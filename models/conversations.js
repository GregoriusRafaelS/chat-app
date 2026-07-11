'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Conversation.belongsToMany(models.User, {
      through: models.ConversationParticipation,
      foreignKey: 'conversationId',
      otherKey: 'userId'
    })
      Conversation.hasMany(models.Message, {foreignKey: 'conversationId'})
      Conversation.hasMany(models.ConversationParticipation, { foreignKey: 'conversationId' })
    }
  }
  Conversation.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    type: {
      type: DataTypes.ENUM('Group', 'Personal'),
      allowNull: false,
      defaultValue: 'Personal'
    }
  }, {
    sequelize,
    modelName: 'Conversation',
  });
  return Conversation;
};