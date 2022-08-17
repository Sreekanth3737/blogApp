const express=require('express');
const dotenv=require('dotenv').config()
const dbConnect=require('./config/dbConfig');
const { errorHandler,notFound } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/usersRoute');
const cors=require('cors')

const app=express();
//Db
dbConnect();

//middleware
app.use(express.json())

//cors
app.use(cors())

//users Route
app.use("/api/users",userRoutes)

//err handler
app.use(notFound)
app.use(errorHandler)
//server
const PORT=process.env.PORT || 5000;
app.listen(5000,console.log(`Server is running ${PORT}`));


//sendgrid Apikey==={ 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 }