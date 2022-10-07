import React from "react";
import "./chatOnline.css";
import axios from "axios";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/api_instance";

export const ChatOnline = ({ onlineUsers, currentUsrId, setCurrentChat }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axiosInstance.get(
        `/api/users/onlile-friends/${currentUsrId}`
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentUsrId]);
  console.log(friends);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axiosInstance.get(
        `/api/chat/find/${currentUsrId}/${user?._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img src={o?.profilePhoto} alt="" className="rounded-full w-10" />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.firstName}</span>
        </div>
      ))}
    </div>
  );
};
