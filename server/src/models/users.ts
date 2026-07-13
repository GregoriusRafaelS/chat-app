import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

export default (sequelize: Sequelize) => {
  class User extends Model<InferAttributes<User>, InferCreationAttributes<User>>{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    declare id: CreationOptional<number>;
    declare fullName: string;
    declare profilePicture: Text | null;
    declare email: string;
    declare password: string;
    declare verified: boolean;

    static associate(models: any) {
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
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
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

