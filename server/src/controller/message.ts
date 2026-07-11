import {Request, Response} from "express"
require('dotenv').config();
const {User, Conversation, Message} = require('../models');
const { superEnkripsi, superDekripsi, encryptAES, decryptAES, encryptImage, decryptImage } = require("./script")

const allMessages = async (req: Request, res: Response) => {
    try {
      const { convId, profilePicture } = req.params; 
      const messages = await Message.findAll({
        where: {
          conversationId: convId,
        },
        include: [
          {
            model: User,
            attributes: ['fullName', 'email', 'id'],
          },
        ],
        order: [['createdAt', 'DESC']], 
      });

      if(messages.length > 0){
        messages.map((message: any) => {
          message.dataValues.content = superDekripsi(message.dataValues.content, 4, true);
          if(message.dataValues.mediaUrl){
            message.dataValues.mediaUrl = decryptAES(message.dataValues.mediaUrl);
            decryptImage(message.dataValues.mediaUrl);
            const separatedPath = message.dataValues.mediaUrl.split('.');
            message.dataValues.mediaUrl = `${separatedPath[0]}-decrypt-image.${separatedPath[1]}`
          }
        });
      }
      res.status(200).json(messages);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

const sendMessage = async (req: Request, res: Response) => {
    const { messageContent, convId, file} = req.body;
    if (!messageContent || !convId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    try {
      const contentEnkrip = superEnkripsi(messageContent, 4);

      let filePathFix;
      if(req.file){
        filePathFix = encryptAES(req.file.path)
        const separatedPath = req.file.path.split('\\');
        encryptImage(separatedPath[1]);
      }else{
        filePathFix = null
      }
      
      const newMessage = {
        senderId: req.user?.userId,
        conversationId: convId,
        type: 'User',
        content: contentEnkrip,
        mediaUrl: filePathFix
      };
      
      const message = await Message.create(newMessage);
      
      res.status(200).json({ message: 'Message sent successfully'});
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }



export {allMessages, sendMessage};