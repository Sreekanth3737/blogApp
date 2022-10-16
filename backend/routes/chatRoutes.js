const express=require('express');
const router=express.Router()
 const authMiddleware = require("../middlewares/auth/authMiddleware");
const {getChat,getChats,createGroup,renameGroup,removeFromGroup,addUserToGroup}=require('../controllers/chatController')

router.route("/").post(getChat).get(getChats);
router.route("/createGroup").post(createGroup);
router.route("/renameGroup").patch(renameGroup);
router.route("/removeFromGroup").patch(removeFromGroup);
router.route("/addUserToGroup").patch(addUserToGroup);





 module.exports=router