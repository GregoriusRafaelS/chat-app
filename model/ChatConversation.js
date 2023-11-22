const Sequelize = require("sequelize");
const my_db = require("../util/connect_db");

const ChatConversation = my_db.define("chat_conversation",{
id:{
  type: Sequelize.INTEGER,
  allowNull: false,
  primaryKey: true,
  autoIncrement: true
}
});

module.exports = ChatConversation;