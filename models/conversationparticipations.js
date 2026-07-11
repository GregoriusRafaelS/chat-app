'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConversationParticipation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConversationParticipation.belongsTo(models.User, { foreignKey: 'userId' })
      ConversationParticipation.belongsTo(models.Conversation, { foreignKey: 'conversationId' })
    }
  }
  ConversationParticipation.init({
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      reference:{
        model: 'Converasation',
        key: 'id'
      },
    },
    userId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      reference:{
        model: 'User',
        key: 'id'
      },
    },
    role: {
      type: DataTypes.ENUM('Member', 'Admin'),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'ConversationParticipation',
  });
  return ConversationParticipation;
};