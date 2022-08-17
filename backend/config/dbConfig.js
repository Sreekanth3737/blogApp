const mongoose=require('mongoose')

const dbConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log('db is connected Successfully');
    } catch (error) {
        console.log(`Error ${error.message}`);
    }

};

module.exports=dbConnect;
