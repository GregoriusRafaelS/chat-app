import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional} from "sequelize";

export default (sequelize: Sequelize) => {
  class ConversationParticipation extends Model<InferAttributes<ConversationParticipation>, InferCreationAttributes<ConversationParticipation>> {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>;
    declare conversationId: number;
    declare userId: number;
    declare role: string;

    static associate(models: any) {
      // define association here
      ConversationParticipation.belongsTo(models.User, { foreignKey: 'userId' })
      ConversationParticipation.belongsTo(models.Conversation, { foreignKey: 'conversationId' })
    }
  }
  ConversationParticipation.init({
    id:{
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
    userId:{
      allowNull:false,
      type: DataTypes.INTEGER,
      references:{
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