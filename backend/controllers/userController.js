const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../config/token/generateToken");
const User = require("../models/userModel");
const validateMongdbId = require("../utils/validateMongodbID");
const sendMail = require("@sendgrid/mail");
const crypto = require("crypto");
const cloudinaryUploadImg=require('../utils/cloudinary')
sendMail.setApiKey(process.env.SEND_GRID_API_KEY);
const fs=require('fs')
require('dotenv').config()
const mg=require('mailgun-js')
const {sendEmail}=require('../utils/nodemailer')
const nodemailer=require('nodemailer');
const blockUser = require("../utils/blockUser");


//---------------------------------------
//Register
//---------------------------------------
const userRegister = expressAsyncHandler(async (req, res) => {
  //check if user Exist
  const userExist = await User.findOne({ email: req?.body?.email });
  if (userExist) throw new Error("User is already exists");

  try {
    const user = await User.create({
      firstName: req.body && req.body.firstName,
      lastName: req.body && req.body.lastName,
      email: req?.body?.email,
      password: req?.body?.password,
    });
    res.json({ user });
  } catch (error) {
    res.json(error);
  }
});

//---------------------------------------
//Login User
//---------------------------------------

const loginUserCtrl = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email });
  //check if user is blocked
  if(userFound?.isBlocked){
    throw new Error('Access denied you are blocked')
  }
  //check if password is match
  if (userFound && (await userFound.isPasswordMatched(password))) {
    res.json({
      _id: userFound?._id,
      firstName: userFound?.firstName,
      lastName: userFound?.lastName,
      email: userFound?.email,
      profilePhoto: userFound?.profilePhoto,
      isAdmin: userFound?.isAdmin,
      token: generateToken(userFound?._id),
      isVerified:userFound?.isAccountVerified,
      status:userFound?.status,
      following:userFound?.following
    });
  } else {
    res.status(401);
    throw new Error("Invalid Login Credentials");
  }
});

//--------------------------------
//fetch users
//----------------------------------

const fetchUserCtrl = expressAsyncHandler(async (req, res) => {
  console.log('all userser++++++++++++++++++++');
 
  try {
    const users = await User.find({}).populate('posts');
    res.json(users);
  } catch (error) {
    res.json(error);
  }
});

//--------------------------------
//Delete users
//----------------------------------

const deleteUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  //check if user id is valid
  validateMongdbId(id);
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.json(deletedUser);
  } catch (error) {
    res.json(error);
  }
});

//---------------------------------
//user details
//---------------------------------

const fetchUserDetailsCtrl = expressAsyncHandler(async (req, res) => {
  console.log('one user+++++++++++++++++++');
  const { id } = req.params;
  validateMongdbId(id);
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    res.json(error);
  }
});


//get online friends
//--------------------------------------------------
const fetchOnlineFriendsCtrl=expressAsyncHandler(async(req,res)=>{
  const {id}=req.params
  try {
    const user=await User.findById(id)
    console.log(user.following+'folo+++++++++++++++++++');
    const friends=await Promise.all(
      user.following.map((friendId)=>{
        //console.log(friendId);
        return User.findById(friendId)
      })
    );
    let friendList=[]
    friends.map((friend)=>{
      const { _id, firstName, lastName,profilePhoto } = friend;
      friendList.push({_id,firstName,lastName,profilePhoto})
    });
    res.status(200).json(friendList)
  } catch (error) {
    res.status(500).json(err)
  }
})

//-----------------------
//User profile
//-----------------------
const userProfileCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongdbId(id);
  //1.find the login user
//2.check this particular user if the login user exists in the array of viewedby
//get the login user
const loginUserId=req?.user?._id?.toString();
console.log(loginUserId)
  try {
    const myProfile = await User.findById(id).populate('posts').populate('viewedBy');
    const alreadyViewed=myProfile?.viewedBy?.find(user =>{
      return user?._id?.toString()===loginUserId;
    });
    if(alreadyViewed){

      res.json(myProfile);
    }else{
      const profile=await User.findByIdAndUpdate(myProfile?._id,{
        $push:{viewedBy:loginUserId},
      })
      res.json(profile)
    }
  } catch (error) {
    res.json(error);
  }
});

//-------------------------
//Update Profile
//-------------------------
const updateUserCtrl = expressAsyncHandler(async (req, res) => {
  const { _id } = req?.user;
  //block user
  blockUser(req?.user)
  validateMongdbId(_id);
  const user = await User.findByIdAndUpdate(
    _id,
    {
      firstName: req?.body?.firstName,
      lastName: req?.body?.lastName,
      email: req?.body?.email,
      bio: req?.body?.bio,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.json(user);
});

//-------------------------------
//Update Password
//-------------------------------
const updatePasswordCtrl = expressAsyncHandler(async (req, res) => {
  //destructure the login user
  const { _id } = req.user;
  const { password } = req.body;
  validateMongdbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    const updatedUser = await user.save();
    res.json(updatedUser);
  }
  res.json(user);
});
//-----------------------------------------------
//following
//-----------------------------------------------
const followingUserCtrl = expressAsyncHandler(async (req, res) => {
  //find the user want to follow and update it's followers field
  //update the login user following field
  const { followId } = req.body;
  const loginUserId = req.user.id;

  //find the target user and check if the login id exist

  const targetUser = await User.findById(followId);

  const alreadyFollowing = targetUser?.followers?.find(
    (user) => user?.toString() === loginUserId.toString()
  );

  if (alreadyFollowing) {
    throw new Error("you have already followed this user");
  }

  //find the user want to follow and update it's followers field
  await User.findByIdAndUpdate(
    followId,
    {
      $push: { followers: loginUserId },
      isFollowing: true,
    },
    { new: true }
  );

  //update the login user following field
  await User.findByIdAndUpdate(
    loginUserId,
    {
      $push: { following: followId },
    },
    { new: true }
  );
  res.json("you have successfully followed this user");
});

//-------------------------------
//unfollow-------------------------
//--------------------------------
const unfollowUserCtrl = expressAsyncHandler(async (req, res) => {
  const { unFollowId } = req.body;
  const loginUserId = req.user.id;

  await User.findByIdAndUpdate(
    unFollowId,
    {
      $pull: { followers: loginUserId },
      isFollowing: false,
    },
    { new: true }
  );

  await User.findByIdAndUpdate(
    loginUserId,
    {
      $pull: { following: unFollowId },
    },
    { new: true }
  );

  res.json("you have successfully unfollowed");
});

//block user------------------------------------
const blockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongdbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: true,
    },
    { new: true }
  );
  res.json(user);
});

const unBlockUserCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongdbId(id);

  const user = await User.findByIdAndUpdate(
    id,
    {
      isBlocked: false,
    },
    { new: true }
  );
  res.json(user);
});

//Generate Email verification token----------------------
const generateVerificationTokenCtrl = expressAsyncHandler(async (req, res) => {
  const {to,from , subject,message,resetUrl}=req.body

  let transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
  }
  })
  const loginUserId = req.user.id;
  const user = await User.findById(loginUserId);
  //console.log(user);

  try {
    //generate token
    const verificationToken = await user?.createAccountVerificationToken();

    //save the user
    await user.save();
    console.log(verificationToken);
    //build your message

    const resetUrl = `if you were requested to verify your account, verify now within 10 minutes,
     otherwise ignore this message <a href="http://localhost:3000/verify-account/${verificationToken}">Click to verify Your Account</a>`;
    const mailOptions = {
      from: process.env.EMAIL,
      to:user?.email,
      subject: "Verify your account",
      html: resetUrl,
    };

    transporter.sendMail(mailOptions,function(err,data){
      if(err){
        console.log('Error Occurs',err)
      }else{
        console.log('Email sent')
      }
    });
    res.json(resetUrl);
  } catch (error) {
    res.json(error);
  }
});

//Account verification-----------------------
const accountVerificationCtrl = expressAsyncHandler(async (req, res) => {
  const { token } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  console.log(hashedToken);

  //find this user by token

  const userFound = await User.findOne({
    accountVerificationToken: hashedToken,
    accountVerificationTokenExpire: { $gt: new Date() },
  });

  if (!userFound) throw new Error("Token expired, try again later");
  //update the property to true
  userFound.isAccountVerified = true;
  userFound.accountVerificationToken = undefined;
  userFound.accountVerificationTokenExpire = undefined;
  await userFound.save();
  res.json(userFound);
});

//forget password token generator--------------------------
const forgetPasswordToken = expressAsyncHandler(async (req, res) => {
  //find the user by email
  const { email } = req.body;
  let transporter=nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service:'gmail',
    auth:{
      user:process.env.EMAIL,
      pass:process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false
  }
  })
  
  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Found");

  try {
    //create token
    const token = await user.createPasswordResetToken();
    console.log(token);
    await user.save();

    //build your message

    const resetUrl = `if you were requested toreset your password, Reset now within 10 minutes,
  otherwise ignore this message <a href="http://localhost:3000/reset-password/${token}">Click here to reset </a>`;
  const msg = {
    from: process.env.EMAIL,
    to:user?.email,
    subject: "Reset Password",
    html: resetUrl,
    message:'Reset your Password'
  };
   
  transporter.sendMail(msg,function(err,data){
    if(err){
      console.log('Error Occurs',err)
    }else{
      console.log('Email sent')
    }
  });
  res.json({
    msg: `A verification message is successfully sent to ${user?.email}.Reset now within 10 minutes, ${resetUrl}`,
  });;
} catch (error) {
  res.json(error);
}
  
  


   
});

//password Reset---------------------------------------------
const passwordResetCtrl = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  //find this user by token

  const user = await User.findOne({ passwordResetToken: hashedToken,passwordResetExpires: {$gt:Date.now()}});

  if (!user) throw new Error("Token Expired, Try again later");

  //update/change the password field
  user.password=password;
  user.passwordResetToken=undefined;
  user.passwordResetExpires=undefined;
  await user.save()
  res.json(user);
});

//profile photo upload------------------------
const profilePhotoUploadCtrl=expressAsyncHandler(async(req,res)=>{
  //find the login user by token
  const {_id}=req.user
  //block user
  blockUser(req?.user)
  const localPath=`public/images/profile/${req.file.filename}`
  //upload to cloudinary
 const imgUploaded= await cloudinaryUploadImg(localPath)

 const foundUser=await User.findByIdAndUpdate(_id,{
    profilePhoto:imgUploaded?.url,
},{new:true})
//remove the saved images
fs.unlinkSync(localPath)
  res.json(imgUploaded)
});

const searchUser=async(req,res)=>{
  const { search } = req.query;
  const user=await User.find({
    firstName:{$regex:search,$options:"i"},

  }).select('firstName profilePhoto _id email lastName');
  res.status(200).json(user)
}

module.exports = {
  userRegister,
  loginUserCtrl,
  fetchUserCtrl,
  deleteUserCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updatePasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  generateVerificationTokenCtrl,
  accountVerificationCtrl,
  forgetPasswordToken,
  passwordResetCtrl,
  profilePhotoUploadCtrl,
  fetchOnlineFriendsCtrl,
  searchUser
};
