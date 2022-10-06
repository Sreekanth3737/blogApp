import React from 'react'
import "./messenger.css";
import {  useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { Conversation } from '../components/conversations/Conversation';
import { Message } from '../components/message/Message';
import { ChatOnline } from '../components/chatOnline/ChatOnline';
import { useSelector } from 'react-redux';
import axiosInstance from "../utils/api_instance";




export const Messenger = () => {
    const user=useSelector(state=>state?.users)
const {userAuth}=user
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const scrollRef = useRef();
    
    useEffect(()=>{

        socket.current = io("ws://localhost:8900");
        socket.current.on('getMessage',data=>{
            setArrivalMessage({
                senderId:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
        })
    },[])


    useEffect(()=>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.senderId)&&
        setMessages((prev)=>[...prev,arrivalMessage])
    },[arrivalMessage,currentChat])


    useEffect(()=>{
        socket.current.emit("addUser", userAuth._id);
        socket.current.on('getUsers',(users)=>{
            console.log(userAuth);
            console.log(users);
         setOnlineUsers(userAuth?.following?.filter((f)=>users?.at((u)=>u.userId===f)))
    })
    },[userAuth])

    console.log(onlineUsers);

    useEffect(()=>{
        const getConversation=async()=>{
            try {
                
                const res=await axiosInstance.get(`/api/chat/${userAuth?._id}`)
                setConversations(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        getConversation()
    },[userAuth?._id])

    useEffect(()=>{
       const getMessages=async()=>{
        try {
            const res=await axiosInstance.get(`/api/message/${currentChat?._id}`)
            setMessages(res.data)
        } catch (error) {
            console.log(error);
        }
       } 

       getMessages()
    },[currentChat])
    console.log(messages)

    const handleSubmit=async(e)=>{
        e.preventDefault()
        const message={
            senderId:user._id,
            text:newMessage,
            chatId:currentChat._id,
        }

        const receiverId=currentChat.members.find(member=>member !==userAuth?._id)

        socket.current.emit('sendMessage',{
            senderId:userAuth?._id,
            receiverId,
            text:newMessage,
        })

        try {
           const res=await axiosInstance.post('/api/message',message) 
           setMessages([...messages,res.data])
        } catch (error) {
          console.log(error)  
        }
    }

    useEffect(()=>{

    },[])

    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"})
    },[messages])




  return (
    <>
      <div className="messenger ">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {conversations.map((c)=>(
                <div onClick={()=>setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={userAuth} />   
                </div>
            ))}
                  

            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {
                    currentChat ?
                    <>
              <div className="chatBoxTop">
                {messages?.map((m)=>(
                    <div ref={scrollRef}>
                    <Message message={m} own={m.senderId===userAuth?._id}/>
                    </div>
                ))}
                    

              </div>
              <div className="chatBoxBottom">
                    <textarea className='chatMessageInput' placeholder='Write something...'
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    ></textarea>
                    <button className='chatSubmitButton' onClick={handleSubmit} >Send</button>
              </div></>: <span className='noConversationText'>Open a conversation to start a chat... </span>

              }
            </div>
        </div>
        <div className="chatOnline">
            <div className="chatOnlineWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentUsrId={userAuth?._id} setCurrentChat={setCurrentChat} />
            </div>
        </div>

        </div> 
    </>
  )
}

