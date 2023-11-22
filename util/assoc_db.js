require("dotenv").config();
const Message = require('../model/Message');
const Friend = require('../model/Friend');
const User = require('../model/User');
const my_db = require('./connect_db');
const Chat = require("../model/Chat");
const ChatConversation = require("../model/ChatConversation");

const statusFriend = [
  {name: "accepted"},
  {name: "pending"},
]

User.hasMany(Message, { as: 'sentMessages', foreignKey: 'senderUserId' });
User.hasMany(Message, { as: 'receivedMessages', foreignKey: 'receiverUserId' });

Message.belongsTo(User, { as: 'sender', foreignKey: 'senderUserId' });
Message.belongsTo(User, { as: 'receiver', foreignKey: 'receiverUserId' });

Chat.hasMany(Message, { as: 'messages', foreignKey: 'chatId'});
Message.belongsTo(Chat, { as: 'chat', foreignKey: 'chatId' });


// Asosiasi antara User dan Chat melalui ChatUser
User.belongsToMany(Chat, { through: ChatConversation }, { as: 'users', foreignKey: 'userId' });
Chat.belongsToMany(User, { through: ChatConversation }, { as: 'chats', foreignKey: 'chatId' });

const association = async()=>{
  try {
    await my_db.sync({force: true});
    // Friend.bulkCreate(statusFriend);
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = association;