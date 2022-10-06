import React from 'react'
import "./message.css";
import {format} from 'timeago.js'
import { useSelector } from 'react-redux';


export const Message = ({message,own}) => {
  const user=useSelector(state=>state?.users)
  const {userAuth}=user
  
  return (
    <div className={own ? 'message own' :'message'}>
        <div className="messageTop">
            <img className='messageImg' src={userAuth?.profilePhoto} alt="" />
            <p className='messageText'>
              {message.text}
            </p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  )
}
