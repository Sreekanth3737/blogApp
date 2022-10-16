const express=require('express');
const router=express.Router()
 const authMiddleware = require("../middlewares/auth/authMiddleware");
const {allMessages,sendMessage}=require('../controllers/messageController')

 router.post('/',sendMessage)
 router.get('/:chatId',allMessages)

 module.exports=router