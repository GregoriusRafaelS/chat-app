const Sequelize = require("sequelize");
const my_db = require("../util/connect_db");

const Message = my_db.define("message",{
  id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  content:{
    type: Sequelize.TEXT,
    allowNull: false
  },
  mediaUrl:{
    type: Sequelize.TEXT,
    allowNull: true
  },
});

module.exports = Message;