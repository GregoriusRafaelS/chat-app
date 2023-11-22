const Sequelize = require("sequelize");
const my_db = require("../util/connect_db");

const Friend = my_db.define("friend",{
  id:{
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  status:{
    type: Sequelize.ENUM("accepted", "pending"),
    allowNull: false
  }
});

module.exports = Friend;