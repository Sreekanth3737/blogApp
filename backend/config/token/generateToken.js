const jwt=require('jsonwebtoken');
const User=require('../../models/userModel')




const generateToken=(id)=>{
    return jwt.sign({ id },process.env.TOKEN_SECRET,{expiresIn:'30d'});

}

module.exports=generateToken