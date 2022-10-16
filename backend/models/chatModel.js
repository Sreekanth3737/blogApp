const mongoose= require('mongoose')

const chatScheema=new mongoose.Schema({
    chatName: {
        type: String,
        trim: true,
      },
      isGroupChat: {
        type: Boolean,
        default: false,
      },
      users: [
        {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
      ],
      latestMessage: {
        type: mongoose.Types.ObjectId,
        ref: "Message",
      },
      groupAdmin: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
   
   
   
    members:{
    type:Array,
   } ,
  
},{
    timestamps:true,
})

const chatModel=mongoose.model("Chat",chatScheema)
module.exports=chatModel