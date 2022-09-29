import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchPostsAction } from "../../../redux/slices/posts/postSlices";
// import AvatarImage from "../assets/avatarImage2.jpg";
// import AvatarImage2 from "../assets/avatarImage3.jpg";
import { cardShadow, hoverEffect, themeColor } from "./utils/color";
import { useNavigate } from 'react-router-dom';

function Projects() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        dispatch(fetchPostsAction(''))
    },[dispatch])
    const post = useSelector((state) => state?.post);
    const { postLists, loading, appErr, serverErr,block,unBlock } = post;
  return (
    <YourProjects>
      <Project>
        
       
        <Detail>
          <Title>Total Number of Posts</Title>
          <SubTitle>in the App</SubTitle>
        </Detail>
      </Project>
      <Project>
        {/* <Avatar>
          <img src='' alt="" />
        </Avatar> */}
        <Detail>
          <Title>{postLists?.length} -Posts</Title>
          {/* <SubTitle></SubTitle> */}
        </Detail>
      </Project>
      <AllProjects onClick={()=>navigate('/')} >See all projects - </AllProjects>
    </YourProjects>
  );
}

const YourProjects = styled.div`
  height: 70%;
  background-color: ${themeColor};
  margin: 0;
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    height: max-content;
    width: 75%;
    margin-top: 1rem;
  }
`;

const Project = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.3rem;
`;
const Avatar = styled.div`
  img {
    height: 4rem;
    width: 4rem;
    border-radius: 4rem;
  }
`;
const Detail = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h3`
  font-weight: 500;
  color:white;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    font-size: 1rem;
  }
`;
const SubTitle = styled.h5`
  font-weight: 300;
  color:white;
`;
const AllProjects = styled.h5`
  text-align: end;
  color: white;
  cursor: pointer;
`;

export default Projects;