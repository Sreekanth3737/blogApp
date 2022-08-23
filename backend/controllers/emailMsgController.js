const expressAsyncHandler=require('express-async-handler')
const sendGrid=require('@sendgrid/mail');
const EmailMsg = require('../models/emailMessagingModel');
const Filter = require("bad-words");

const sendEmailMsgCtrl=expressAsyncHandler(async(req,res)=>{
    const {to,subject,message}=req.body;
    const emailMessage=subject+" "+message;
    //prevent profanity/bad words
    const filter=new Filter();

    const isProfane=filter.isProfane(emailMessage);
    if(isProfane)
        throw new Error("Email sent failed, because it contains profane words.")
    try {
       //build up msg
       const msg={
        to,
        subject,
        text:message,
        from:'sreekanth3265@gmail.com'

       };
       //send msg
       await sendGrid.send(msg)
       //save to our db
       await EmailMsg.create({
        sentBy:req?.user?._id,
        from:req?.user?.email,
        to,
        message,
        subject,

       })
       res.json('mail sent')
    } catch (error) {
        res.json(error)
    }
});


module.exports={sendEmailMsgCtrl}