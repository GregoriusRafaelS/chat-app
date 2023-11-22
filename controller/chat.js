const { Op, where } = require('sequelize');
const Chat = require('../model/Chat');
const User = require('../model/User');
const Message = require('../model/Message');
const ChatConversation = require('../model/ChatConversation');

const accessChat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    const isChat = await Chat.findOne({
      where: {
        isGroupChat: false
      },
      include: [
        {
          model: User,
          as: 'users',
          attributes: { exclude: ['password'] },
          through: {
            model: ChatConversation,
            attributes: [],
          },
          where: {
            id: {
              [Op.in]: [req.user.id, userId],
            },
          },
        },
      ],
    });
    
    if (isChat) {
      res.json(isChat);
    } else {
      const chatData = {
        chatName: 'sender',
        isGroupChat: false,
      };
      
      const createdChat = await Chat.create(chatData);
      
      await createdChat.addUsers([req.user.userId, userId]);
      
      const fullChat = await Chat.findOne({
        where: { id: createdChat.id },
        include: [
          {
            model: User,
            as: 'users',
            attributes: { exclude: ['password'] },
          },
        ],
      });
      
      res.status(200).json(fullChat);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const fetchChat = async (req, res) => {
  try {
    const keyword = req.query.search;
    const searchCriteria = keyword ? {
      [Op.or]: [
        { fullName: { [Op.like]: `%${keyword}%` } },
        { email: { [Op.like]: `%${keyword}%` } },
      ],
    } : {};

    const chatResults = await ChatConversation.findAll({
      where: {
        userId: req.user.userId
      }
    })

    let userChats = [];
    
    for (const chatResult of chatResults) {
      const chatId = chatResult.chatId;
      let chat = await Chat.findOne({
        include: [
          {
            model: User,
            as: 'users',
            attributes: { exclude: ['password'] },
            through: {
              model: ChatConversation,
              where: {
                userId: {
                  [Op.not]: req.user.userId,
                },
              },
            },
          },
          {
            model: Message,
            as: 'messages',
            limit: 1,
            order: [['updatedAt', 'DESC']],
            include: [
              {
                model: User,
                as: 'sender',
                attributes: ['fullName', 'email'],
              },
            ],
          },
        ],
        where:{
          id: chatId
        }
      });
      if (chat) {
        userChats.push(chat);
      }
    }

    userChats = userChats.map(chat => {
      console.log(chat.users[0].fullName)
      if (chat.isGroupChat === false) {
        return {
          chatId: chat.id,
          fullName: chat.users[0].fullName,
          profilePicture: chat.users[0].profilePicture,
          messages: chat.messages,
        };
      } else {
        return chat;
      }
    }).filter(chat => chat !== null);

    res.status(200).json(userChats);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const fetchGroup = async (req, res) => {
  try {
    const allGroups = await Chat.findAll({
      where:{
        isGroupChat: true
      }
    });
    res.status(200).json(allGroups);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
}

const createGroupChat = async (req, res) => {
}

const exitGroup = async (req, res) => {
}

module.exports = { accessChat, fetchChat, fetchGroup, createGroupChat, exitGroup };
