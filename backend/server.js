const express=require('express');
const dotenv=require('dotenv').config()
const dbConnect=require('./config/dbConfig');
const { errorHandler,notFound } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/usersRoute');
const postRoutes=require('./routes/postRoutes')
const cors=require('cors')
const port=process.env.PORT || 7000;

const app=express();
//Db
dbConnect();

//middleware
app.use(express.json())

//cors
app.use(cors())

//users Route
app.use("/api/users",userRoutes)
//post route
app.use("/api/posts",postRoutes)
//err handler
app.use(notFound)
app.use(errorHandler)
//server
 //app.listen(5000,console.log(`Server is running ${port}`));
 app.listen(port,()=>console.log(`Server started on port ${port}`))
 

//sendgrid Apikey==={ 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 }