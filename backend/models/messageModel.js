const mongoose= require('mongoose')

const messageScheema=new mongoose.Schema({
   
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      chat: {
        type: mongoose.Types.ObjectId,
        ref: "Chat",
      },
      message: {
        type: String,
        trim: true,
      },
      
    
   chatId:{
    type:String,
   } ,
   senderId:{
    type:String
   },
   

   text:{
    type:String
   },
   
},{
    timestamps:true,
})

const messageModel=mongoose.model("Message",messageScheema)
module.exports=messageModel