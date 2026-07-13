import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from "sequelize";

export default (sequelize: Sequelize) => {
  class Conversation extends Model<InferAttributes<Conversation>, InferCreationAttributes<Conversation>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>;
    declare name: string;
    declare profilePicture: Text;
    declare type: string;

    static associate(models: any) {
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
    id:{
      type: DataTypes.NUMBER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
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