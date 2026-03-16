require('dotenv').config();
const User = require('../model/User');
const Message = require('../model/Message');
const Chat = require('../model/Chat');
const { superEnkripsi, superDekripsi, encryptAES, decryptAES, encryptImage, decryptImage } = require("./script")

const messageController = {
  allMessages : async (req, res) => {
    try {
      
      const { chatId, fullName, profilePicture } = req.params; 
      const messages = await Message.findAll({
        where: {
          chatId,
        },
        include: [
          {
            model: User,
            as: 'sender',
            attributes: ['fullName', 'email', 'id'],
          },
          {
            model: User,
            as: 'receiver',
            attributes: ['fullName', 'email', 'id'],
          },
          {
            model: Chat,
            as: 'chat',
          },
        ],
        order: [['updatedAt', 'DESC']], 
      });

      messages.map(message => {
        message.content = superDekripsi(message.content, 4, true);
        if(message.mediaUrl !== "Ga ada file nih"){
          message.mediaUrl = decryptAES(message.mediaUrl);
          decryptImage(message.mediaUrl);
          const separatedPath = message.mediaUrl.split('.');
          message.mediaUrl = `${separatedPath[0]}-decrypt-image.${separatedPath[1]}`
        }
      });
      
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  sendMessage : async (req, res) => {
    const { content, chatId, fullName } = req.body;

    if (!content || !chatId || !fullName) {
      console.log("Invalid data passed into request");
      return res.sendStatus(400);
    }

    const contentEnkrip = superEnkripsi(content, 4);

    try {
      const receiver = await User.findOne({
        where:{
          fullName
        }
      })
      
      let filePathFix;
      if(req.file){
        filePathFix = encryptAES(req.file.path)
        const separatedPath = req.file.path.split('\\');
        encryptImage(separatedPath[1]);
      }else{
        filePathFix = "Ga ada file nih"
      }
      
      const newMessage = {
        senderUserId: req.user.userId,
        receiverUserId: receiver.id,
        content: contentEnkrip,
        chatId: chatId,
        mediaUrl: filePathFix
      };
      
      const message = await Message.create(newMessage);
      
      const populatedMessage = await Message.findByPk(message.id, {
        include: [
          { model: User, as: 'sender', attributes: ['fullName', 'email'] },
          { model: Chat, as: 'chat' , attributes: ['id'], include: [{ model: User, as: 'users', attributes: ['fullName', 'email'] }] },
          { model: User, as: 'receiver' },
        ],
      });
  
      res.status(200).json({ message: 'Message sent successfully', data: populatedMessage });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}



module.exports = messageController;