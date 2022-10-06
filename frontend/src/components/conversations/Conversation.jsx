import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from "axios";
import "./conversation.css";
import axiosInstance from "../../utils/api_instance";

export const Conversation = ({conversation,currentUser}) => {
    const [user, setUser] = useState(null);

  useEffect(()=>{
    const friendId=conversation.members.find((m)=>m!==currentUser._id)
    const getUser=async()=>{
        try {

    const res=await axiosInstance(`/api/users/${friendId}`)
      setUser(res.data)
    } catch (error) {
      console.log(error)
    }
  };
  getUser()
  },[currentUser,conversation])


  return (
    <div className='conversation'>
<img className='conversationImg' src={user?.profilePhoto} alt="" />
<span className='conversationName'>{user?.firstName}{user?.lastName}</span>
    </div>
  )
}
