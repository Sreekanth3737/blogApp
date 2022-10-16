const express=require('express');
const dotenv=require('dotenv').config()
const dbConnect=require('./config/dbConfig');
const { errorHandler,notFound } = require('./middlewares/errorHandler');
const userRoutes = require('./routes/usersRoute');
const postRoutes=require('./routes/postRoutes')
const categoryRoutes=require('./routes/categoryRoute')
const commentRoutes=require('./routes/commentRoute')
const sendEmailRoutes=require('./routes/sendEmailRoute')
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoutes')
const authMiddleware=require('./middlewares/auth/authMiddleware')
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
//send message (socket io)
app.use('/api/chat',authMiddleware,chatRoutes)
//message route
app.use('/api/message',authMiddleware,messageRoutes)


//err handler
app.use(notFound)
app.use(errorHandler)
//server
 //app.listen(5000,console.log(`Server is running ${port}`));
 const server=app.listen(port,()=>console.log(`Server started on port ${port}`))
 

 //socket io
 const io=require('socket.io')(server,{
    pingTimeout:60000,
    cors:{
        origin:"*",
       
    }
 })

 io.on("connection", (socket) => {
    //connected to correct id
    socket.on("setup", (userData) => {
      socket.join(userData._id);
  
      socket.emit("connected");
    });
  
    socket.on("join-chat", (room) => {
      socket.join(room);
    });
  
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop-typing", (room) => socket.in(room).emit("stop-typing"));
  
    socket.on("new-message", (newMessageReceived) => {
      let chat = newMessageReceived.chat;
  
      if (!chat.users) return console.log(`chat.users not defined`);
  
      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) return;
  
        socket.in(user._id).emit("message-received", newMessageReceived);
      });
    });
  
    socket.off("setup", () => {
      socket.leave(userData._id);
    });
  });
  

