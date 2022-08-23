const express=require('express');
const router=express.Router()
 const authMiddleware = require("../middlewares/auth/authMiddleware");

 const {sendEmailMsgCtrl}=require('../controllers/emailMsgController')

 router.post('/',authMiddleware,sendEmailMsgCtrl)

 module.exports=router