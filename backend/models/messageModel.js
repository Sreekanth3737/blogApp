const mongoose= require('mongoose')

const messageScheema=new mongoose.Schema({
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