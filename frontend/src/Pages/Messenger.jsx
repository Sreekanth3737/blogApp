import React from "react";
import {Box} from '@chakra-ui/react'
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/api_instance";
import SideDrawer from "../components/chatComponents/SideDrawer";
import MyChats from "../components/chatComponents/MyChats";
import ChatBox from "../components/chatComponents/ChatBox";

 const Messenger = () => {
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
    const [fetchAgain, setFetchAgain] = useState(false);


  
  return (
    <div style={{ width: "100%" }}>
      {userAuth && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {userAuth && <MyChats fetchAgain={fetchAgain} />}
        {userAuth && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Messenger
