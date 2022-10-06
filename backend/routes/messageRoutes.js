const express=require('express');
const router=express.Router()
 const authMiddleware = require("../middlewares/auth/authMiddleware");
const {addMessage,getMessages}=require('../controllers/messageController')

 router.post('/',addMessage)
 router.get('/:chatId',getMessages)

 module.exports=router