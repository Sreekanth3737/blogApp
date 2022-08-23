const express=require('express');
const dotenv=require('dotenv').config()
const dbConnect=require('./config/dbConfig');
const { errorHandler,notFound } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/usersRoute');
const postRoutes=require('./routes/postRoutes')
const categoryRoutes=require('./routes/categoryRoute')
const commentRoutes=require('./routes/commentRoute')
const sendEmailRoutes=require('./routes/sendEmailRoute')
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
//category route
app.use('/api/category',categoryRoutes)
//comment route
app.use('/api/comments',commentRoutes)
//send email
app.use('/api/email',sendEmailRoutes)


//err handler
app.use(notFound)
app.use(errorHandler)
//server
 //app.listen(5000,console.log(`Server is running ${port}`));
 app.listen(port,()=>console.log(`Server started on port ${port}`))
 

