import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export default (sequelize: Sequelize) => {
  class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<Number>;
    declare conversationId: number;
    declare senderId: number;
    declare replyId: number | null;
    declare content: string | null;
    declare mediaUrl: string | null;
    declare type: string;

    static associate(models: any) {
      // define association here
      Message.belongsTo(models.Conversation, {foreignKey: 'conversationId'})
      Message.belongsTo(models.User, {foreignKey: 'senderId'})
      Message.hasMany(models.Reaction, {foreignKey: 'messageId'})
    }
  }
  Message.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    conversationId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model: 'Converasation',
        key: 'id'
      },
    },
    senderId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references:{
        model: 'User',
        key: 'id'
      },
    },
    replyId:{
      allowNull:true,
      type: DataTypes.INTEGER,
      references:{
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