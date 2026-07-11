const { Op, where,literal } = require('sequelize');
const {Conversation, ConversationParticipation, User, Message} = require('../models');
const { superDekripsi } = require('./script');

const addConversation = async (req, res) => {
  const { type, userId } = req.body;
  
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }
  try {
    const existing = await Conversation.findAll({
      where: {
        type: 'Personal'
      },
      include: [
        {
          model: ConversationParticipation,
          where: {
            userId: {
              [Op.in]: [userId, req.user.userId]
            }
          },
        }
      ],
      group: ['Conversation.id'],
      having: literal('COUNT(DISTINCT ConversationParticipations.userId) = 2')
    })
    if(existing.length > 0){
      return res.status(200).json(existing[0])
    }
    
    const conversationData = {
      name: null,
      type: 'Personal',
      profilePicture: null
    };
    
    const newConversation = await Conversation.create(conversationData);
    
    const conversationId = newConversation.id;
    
    await ConversationParticipation.bulkCreate([
      {
        conversationId: conversationId,
        userId: req.user.userId,
        role: 'Member'
      },
      {
        conversationId: conversationId,
        userId: userId,
        role: 'Member'
      }
    ])
    
    res.status(200).json(conversationId);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

let fetchConversation = async (req, res) => {
  try {
    const keyword = req.query.searchTerm;
    const searchCriteria = keyword ? {
      [Op.or]: [
        { fullName: { [Op.like]: `%${keyword}%` } },
        { email: { [Op.like]: `%${keyword}%` } },
      ],
    } : {};

    let conversations = await Conversation.findAll({
      where: keyword
        ? {
            [Op.or]: [
              {
                type: 'Personal',
                '$Users.fullName$': {
                  [Op.like]: `%${keyword}%`
                }
              },
              {
                type: 'Group',
                name: {
                  [Op.like]: `%${keyword}%`
                }
              }
            ]
          }
        : {},

      include: [
        {
          model: ConversationParticipation,
          where: {
            userId: req.user.userId
          },
          attributes: []
        },
        {
          model: User,
          attributes: { exclude: ['password'] },

          through: {
            attributes: []
          },
          where: {
            id: {
              [Op.ne]: req.user.userId
            }
          },
        },
        {
          model: Message,
          limit: 1,
          separate: true,
          order: [['createdAt', 'DESC']],
        }
      ],

      order: [['updatedAt', 'DESC']]
    });

    conversations = conversations.filter(
      conv => conv.Messages.length > 0
    );

    conversations = conversations.map(conv => {
      if (conv.type === 'Personal') {
        if(conv.Messages[0]) superDekripsi(conv.Messages[0].dataValues.content, 4, true)
          return {
          conversationId: conv.id,
          fullName: conv.Users[0].dataValues.fullName,
          profilePicture: conv.Users[0].dataValues.profilePicture,
          messages: conv.Messages[0].dataValues.content,
          updatedAt: conv.Messages[0].dataValues.updatedAt
        };
      } else {
        return conv;
      }
    }).filter(conv => conv !== null);

    res.status(200).json(conversations);
  } catch (error) {
    console.log(error)
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

module.exports = { addConversation, fetchConversation, fetchGroup, createGroupChat, exitGroup };
