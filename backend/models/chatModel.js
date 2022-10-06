const mongoose= require('mongoose')

const chatScheema=new mongoose.Schema({
   members:{
    type:Array,
   } ,
  
},{
    timestamps:true,
})

const chatModel=mongoose.model("Chat",chatScheema)
module.exports=chatModel