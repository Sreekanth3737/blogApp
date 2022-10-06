const express=require('express');
const router=express.Router()
 const authMiddleware = require("../middlewares/auth/authMiddleware");
const {createChat,findChat,userChats}=require('../controllers/chatController')

 router.post('/',createChat)
 router.get('/:userId',userChats)
 router.get('/find/:firstId/:secondId',findChat)



 module.exports=router