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
app.use('/api/chat',chatRoutes)
//message route
app.use('/api/message',messageRoutes)


//err handler
app.use(notFound)
app.use(errorHandler)
//server
 //app.listen(5000,console.log(`Server is running ${port}`));
 const server=app.listen(port,()=>console.log(`Server started on port ${port}`))
 

 //socket io
//  const io=require('socket.io')(server,{
//     pingTimeout:60000,
//     cors:{
//         origin:"http://localhost:3000",
       
//     }
//  })

//  let activeUsers=[]
 
//  io.on('connection',(socket)=>{
//     //add new user
//     socket.on("new-user-add", (newUserId) => {
//         // if user is not added previously
//         if (!activeUsers.some((user) => user.userId === newUserId)) {
//           activeUsers.push({ userId: newUserId, socketId: socket.id });
//           console.log("New User Connected", activeUsers);
//         }
//         // send all active users to new user
//         io.emit("get-users", activeUsers);
//       });
    
//       socket.on("disconnect", () => {
//         // remove user from active users
//         activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
//         console.log("User Disconnected", activeUsers);
//         // send all active users to all users
//         io.emit("get-users", activeUsers);
//       });
    
//       // send message to a specific user
//   socket.on("send-message", (data) => {
//     const { receiverId } = data;
//     const user = activeUsers.find((user) => user.userId === receiverId);
//     console.log("Sending from socket to :", receiverId)
//     console.log("Data: ", data)
//     if (user) {
//       io.to(user.socketId).emit("recieve-message", data);
//     }
//   });
    
//  })

