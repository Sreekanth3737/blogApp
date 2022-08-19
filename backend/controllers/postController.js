const Post=require('../models/PostModel')
const User=require('../models/UserModel')
const  Filter=require('bad-words')
const fs=require('fs')
const expressAsyncHandler = require("express-async-handler");
const validateMongodbID=require('../utils/validateMongodbID')
const cloudinaryUploadImg=require('../utils/cloudinary')

//create post----------------------------------------------
const createPostCtrl=expressAsyncHandler(async(req,res)=>{
    console.log(req.file);
    const {_id}=req.user
    //validateMongodbID(req.body.user)
    //check for bad words
   const filter=new Filter()
   const isProfane=filter.isProfane(req.body.title,req.body.description)
   //block user 
   if(isProfane){
    const user=await User.findByIdAndUpdate(_id,{
        isBlocked:true,
    });
    throw new Error("Creating Failed because it contains profane words and have been blocked")
   }
    
   const localPath=`public/images/posts/${req.file.filename}`
   //upload to cloudinary
  const imgUploaded= await cloudinaryUploadImg(localPath)
    try {
        // const post=await Post.create({...req.body,
        //     image:imgUploaded?.url,
        //     user:_id,
            
            
        // });

        res.json(imgUploaded);
        //remove uploaded img
        fs.unlinkSync(localPath)
    } catch (error) {
       res.json(error) 
    }
});

//fetch all posts-----------------------------------------
const fetchPOstsCtrl=expressAsyncHandler(async(req,res)=>{
    try {
      const posts=await Post.find({}).populate('user')
      res.json(posts)  
    } catch (error) {
        res.json(error)
    }
})


module.exports={
    createPostCtrl,
    fetchPOstsCtrl,
}