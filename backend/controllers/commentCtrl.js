const expressAsyncHandler = require("express-async-handler");
const { Error } = require("mongoose");
const Comment = require("../models/commentModel");
const blockUser = require("../utils/blockUser");
const validateMongdbId = require("../utils/validateMongodbID");

//create comment----------------------------------------------
const createCommentCtrl = expressAsyncHandler(async (req, res) => {
  //get the user
  const user = req.user;
  //check if user is blocked
//   if(user?.isBlocked){
//     throw new Error(`Access Denied, ${user?.firstName} You are blocked`)
//   }
  blockUser(user);
  //get the post ID
  const { postId,  description } = req.body;

  try {
    const comment = await Comment.create({
      post: postId,
      user: user,
      description:description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error);
  }
});

//fetch all comments-----------------------------------
const fetchAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
 
    try {
       const comments=await Comment.find({}).sort('-createdAt') ;
       res.json(comments)
    } catch (error) {
       res.json(error) 
    }
});

//fetch a single comment details-----------------

const fetchCommentCtrl=expressAsyncHandler(async(req,res)=>{
const {id}=req.params
validateMongdbId(id)

try {
    const comment=await Comment.findById(id)
    res.json(comment)
} catch (error) {
    res.json(error)
}
});

//update comment------------------------------------
const updateCommentCtrl=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params
    validateMongdbId(id)

    try {
        const updateComment =await Comment.findByIdAndUpdate(id,{
            post:req?.body?.postId,
            user:req?.user,
            description:req?.body?.description
        },{new:true,runValidators:true});
        res.json(updateComment)
    } catch (error) {
       res.json(error) 
    }
});

//delete comment---------------------------------------
const deleteCommentCtrl=expressAsyncHandler(async(req,res)=>{
    const{id}=req.params;
validateMongdbId(id)
    try {
        const deleteComment=await Comment.findByIdAndDelete(id);
        res.json(deleteComment)
    } catch (error) {
        res.json(Error)
    }
})



module.exports = { createCommentCtrl, fetchAllCommentsCtrl ,fetchCommentCtrl,updateCommentCtrl,deleteCommentCtrl};
