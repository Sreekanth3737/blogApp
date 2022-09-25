const EmailMsg=require('../models/emailMessagingModel')
const Filter=require('bad-words')
const nodemailer=require('nodemailer')
require('dotenv').config()

let mailTransporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.EMAIL,
        pass:process.env.PASSWORD,
    },
})

const sendEmail=(msg)=>{
    return new Promise((resolve,reject)=>{
        const { to, from, subject, message, sentBy } = msg; 
        const emailMessage = subject + " " + message;
        const filter = new Filter();
		const isProfane = filter.isProfane(emailMessage);
		if (isProfane) {
			let err = "Email sent failed ,because it contain profane words";
			reject(err);
		} else {
			let mailOptions = {
				to,
				from,
				subject,
				text: message,
			};
    // send msg
			mailTransporter.sendMail(mailOptions, function (err, data) {
				if (err) {
					console.log("Error Occurs", err);
					reject(err);
				} else {
					console.log("Email sent", data);
					resolve(data);
				}
			});
		}
	});
};

module.exports={sendEmail}
