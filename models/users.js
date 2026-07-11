'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    User.belongsToMany(models.Conversation, {
      through: models.ConversationParticipation,
      foreignKey: 'userId',
      otherKey: 'conversationId'
    })
      User.hasMany(models.Reaction, {foreignKey: 'userId'})
      User.hasMany(models.Message, {foreignKey: 'senderId'})
    }
  }
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};