import React from 'react'
import styled from "styled-components";
import { RiHomeLine, RiFileCopyLine } from "react-icons/ri";
import { FaWallet } from "react-icons/fa";
import { AiOutlinePieChart } from "react-icons/ai";
import {darkThemeColor} from './utils/color'
import Badge from './Badge';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { logoutAction } from "../../../redux/slices/users/usersSlice";

function Sidebar({isLogin}) {
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const state = useSelector((state) => state?.users);
  const { userAuth ,profile} = state;
  const isAdmin = userAuth?.isAdmin;
  return (
    <Container>
      <ProfileContainer>
        <Avatar src={userAuth?.profilePhoto} />
        <Name>{userAuth?.firstName}</Name>
        <Badge content="Admin" />
      </ProfileContainer>
      <LinksContainer>
        <Links>
          <Link >
            <RiHomeLine />
            <h3 onClick={()=>navigate('/admin-dashboard')} >Dashboard</h3>
          </Link>
          <Link >
            <RiHomeLine />
            <h3 onClick={()=>navigate('/create-post')} >Create-Post</h3>
          </Link>
          <Link >
            <RiHomeLine />
            <h3 onClick={()=>navigate('/add-category')} >Add-Category</h3>
          </Link>
          <Link >
            <RiFileCopyLine />
            <h3 onClick={()=>navigate('/users')} >All Users</h3>
          </Link>
          <Link>
            <FaWallet />
            <h3 onClick={()=>navigate('/category-list')}>Categories</h3>
          </Link>
          <Link>
            <AiOutlinePieChart />
            <h3 onClick={()=>navigate('/')}>All Posts</h3>
          </Link>
        </Links>
        <Button onClick={()=>dispatch(logoutAction())}>

        <Badge  content='logout'/>
        </Button>
        
      </LinksContainer>
    </Container>
  )
}


const Container = styled.div`
  width: 20%;
  height: 100% !important;
  border-radius: 2rem;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    height: max-content !important;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Avatar = styled.img`
  height: 7rem;
  border-radius: 6rem;
  margin-top: 20%;
`;

const Name = styled.h1`
  color: blue;
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0.8rem 0 0.5rem 0;
`;

const LinksContainer = styled.div`
  background-color: #fff;
  height: 100%;
  width: 100%;
  border-radius: 2rem;
`;

const Links = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding-top: 2rem;
  height: 60%;
`;

const Link = styled.li`
  margin-left: 25%;
  margin-bottom: 2rem;
  display: flex;
  gap: 1rem;
  color: #eblack;
  cursor: pointer;
  h3 {
    font-weight: 300;
  }
  svg {
    font-size: 1.1rem;
    margin-top: 3%;
  }
`;
const Button=styled.button`
margin-top:30%;
margin-left:5%

`


export default Sidebar