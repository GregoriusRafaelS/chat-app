import {NextFunction, Request, Response} from "express"
import db from "../models/index";
import { superEnkripsi, superDekripsi, encryptAES, decryptAES, encryptImage, decryptImage } from "./script"
import { getIo } from "../util/socket";

require('dotenv').config();
const {User, Message} = db
const io = getIo();

const allMessages = async (req: Request, res: Response, next: NextFunction) => {
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
            decryptImage(`${message.dataValues.mediaUrl}`);
            const separatedPath = message.dataValues.mediaUrl.split('.');
            message.dataValues.mediaUrl = `${separatedPath[0]}-decrypt-image.${separatedPath[1]}`
          }
        });
      }
      res.status(200).json(messages);
    } catch (error: any) {
      next(error);
    }
  }

const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
    const { messageContent, convId, fullName} = req.body;
    if ((!messageContent && !req.file) || !convId) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    try {
      const contentEnkrip = superEnkripsi(messageContent, 4);

      let filePathFix;
      if(req.file){
        filePathFix = encryptAES(req.file.path)
        const separatedPath = req.file.path.split('\\');
        encryptImage(separatedPath[2]);
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
      
      io.to(`conversation-${convId}`).emit("receive-message", {conversationId: convId, content: messageContent, senderId: req.user?.userId, mediaUrl: req.file?.path || null, createdAt: new Date(), User:{fullName: fullName}});

      res.status(200).json({ message: 'Message sent successfully'});
    } catch (error: any) {
      next(error)
    }
  }



export {allMessages, sendMessage};