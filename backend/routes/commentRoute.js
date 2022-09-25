const express=require('express');
const router=express.Router()
const authMiddleware = require("../middlewares/auth/authMiddleware");
const { createCommentCtrl ,fetchAllCommentsCtrl,fetchCommentCtrl,updateCommentCtrl,deleteCommentCtrl} = require('../controllers/commentCtrl');


router.post('/',authMiddleware,createCommentCtrl)
router.get('/',fetchAllCommentsCtrl)
router.get('/:id',authMiddleware,fetchCommentCtrl)
router.put('/:id',authMiddleware,updateCommentCtrl)
router.delete('/:id',authMiddleware,deleteCommentCtrl)

module.exports=router