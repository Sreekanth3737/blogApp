const Message=require('../models/messageModel')
const User=require('../models/userModel')
const Chat=require('../models/chatModel')
const sendMessage=async(req,res)=>{
    const{message,chatId}=req.body

    if (!message || !chatId) {
        return BadRequestError("Please Provide All Fields To send Message");
    }

    let newMessage = {
        sender: req.user.id,
        message: message,
        chat: chatId,
      };
    
      let m = await Message.create(newMessage);
      m = await m.populate("sender", "firstName profilePhoto");
      m = await m.populate("chat");
      m = await User.populate(m, {
        path: "chat.users",
        select: "firstName profilePhoto email _id",
      });

      await Chat.findByIdAndUpdate(chatId, { latestMessage: m }, { new: true });

  res.status(200).json(m);
    


    
}

const allMessages=async(req,res)=>{
    const {chatId}=req.params
    
    const getMessage=await Message.find({chat:chatId}).populate("sender", "firstName profilePhoto email _id").populate("chat")
    res.status(200).json(getMessage)
}

module.exports={allMessages,sendMessage}