const expressAsyncHandler=require('express-async-handler')
const sendGrid=require('@sendgrid/mail');
const EmailMsg = require('../models/emailMessagingModel');
const Filter = require("bad-words");
const nodemailer=require('nodemailer')
require("dotenv").config();
const {sendEmail}=require('../utils/nodemailer')




const sendEmailMsgCtrl=expressAsyncHandler(async(req,res)=>{
    try{

  
    const {to,subject,message}=req.body;
    console.log(req.body);
    const msg={
        to,
        from:process.env.EMAIL,
        subject,
        message,
        sentBy:req?.user?._id,
    };

    const resData=await sendEmail(msg)
    //save to our db
    await EmailMsg.create({
        sentBy:req?.user?._id,
        from:req?.user?.email,
        to,
        message,
        subject,
    });
    res.json("Email Sent");

}catch(error){
    res.json(error)
}

});


module.exports={sendEmailMsgCtrl}