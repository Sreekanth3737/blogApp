const Message=require('../models/messageModel')


const addMessage=async(req,res)=>{
   // const{chatId,senderId,text}=req.body
    const message=new Message(req.body);

    try {
        const savedMessage=await message.save();
        res.status(200).json(savedMessage)
    } catch (error) {
        res.status(500).json(error)
    }
}

const getMessages=async(req,res)=>{
    const {chatId}=req.params
    try {
        const message=await Message.find({chatId})
       res.status(200).json(message) 
    } catch (error) {
        res.status(500).json(error)
 
    }
}

module.exports={addMessage,getMessages}