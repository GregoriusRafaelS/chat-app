const Sequelize = require("sequelize");
const my_db = require("../util/connect_db");

const Chat = my_db.define("chat",{
  id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  chatName:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  isGroupChat:{
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
});

module.exports = Chat;