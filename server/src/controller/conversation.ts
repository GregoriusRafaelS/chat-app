import { Op,literal } from "sequelize";
import { NextFunction, Request, Response } from "express";
import db from "../models/index";
import { encryptAES, encryptImage } from "./script";
const {Conversation, ConversationParticipation, User, Message} = db
const { superDekripsi } = require('./script');

const addConversation = async (req: Request, res: Response, next: NextFunction) => {
  const {userId} = req.body;

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
              [Op.in]: [userId, req.user?.userId]
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
      name: "-",
      type: 'Personal',
      profilePicture: null
    };
    
    const newConversation = await Conversation.create(conversationData);
    
    const conversationId = newConversation.id;
    
    await ConversationParticipation.bulkCreate([
      {
        conversationId: conversationId,
        userId: req.user?.userId,
        role: 'Member'
      },
      {
        conversationId: conversationId,
        userId: userId,
        role: 'Member'
      }
    ])
    console.log(conversationId)
    res.status(200).json({id: conversationId});
  } catch (error: any) {
    next(error);
  }
};

let fetchConversation = async (req: Request, res: Response, next: NextFunction) => {
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
            userId: req.user?.userId
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
              [Op.ne]: req.user?.userId
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
      (conv: any) => conv.Messages.length > 0
    );

    conversations = conversations.map((conv: any) => {
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
    }).filter((conv: any) => conv !== null);

    res.status(200).json(conversations);
  } catch (error: any) {
    next(error);
  }
};

const fetchGroup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const allGroups = await Conversation.findAll({
      where:{
        isGroupChat: true
      }
    });
    res.status(200).json(allGroups);
  } catch (error: any) {
    next(error);
  }
}

const createGroupChat = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, users } = req.body

      let filePathFix;
      console.log("GDGDGDGDG")
      if(req.file){
        console.log("GDGDGDGDG")
        filePathFix = encryptAES(req.file.path)
        const separatedPath = req.file.path.split('\\');
        encryptImage(separatedPath[1]);
      }else{
        filePathFix = null
      }

    const conversationData = {
      name: name,
      type: "group",
      profilePicture: filePathFix || null
    }

    const newConversation = await Conversation.create(conversationData)
    const conversationId = newConversation.id

    users.map(async (user: any) => {
      await ConversationParticipation.create({
        conversationId: conversationId,
        userId: user.id,
        role: "Member"
      })
    });

    await ConversationParticipation.bulkCreate([
      {
        conversationId: conversationId,
        userId: req.user?.userId,
        role: "Admin"
      },
    ])

    console.log(conversationId);
    res.status(200).json({id: conversationId, nameConversation: name});
  } catch (error: any) {
    next(error)
  }
}

const exitGroup = async (req: Request, res: Response) => {
}

export { addConversation, fetchConversation, fetchGroup, createGroupChat, exitGroup };
