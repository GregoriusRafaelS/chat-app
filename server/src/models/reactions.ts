import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export default (sequelize: Sequelize) => {
  class Reaction extends Model <InferAttributes<Reaction>, InferCreationAttributes<Reaction>>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>
    declare messagesId: number;
    declare userId: number;
    declare emoji: string;

    static associate(models: any) {
      // define association here
      Reaction.belongsTo(models.Message, {foreignKey: 'messagesId'})
      Reaction.belongsTo(models.User, {foreignKey: 'userId'})
    }
  }
  Reaction.init({
    id:{
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
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