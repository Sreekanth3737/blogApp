import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchCategoriesAction } from "../../../redux/slices/category/categorySlice";
import Badge from "./Badge";
import { cardShadow, hoverEffect } from "./utils/color";

function Invoices(user) {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchCategoriesAction())
  },[dispatch])
  const category=useSelector((state)=>state?.category)
  const{categoryList}=category
  
  return (
    <InvoicesContainer>
      <CardContent>
        <Invoice>
          <Info>
            {/* <Avatar>
              <img src='' alt="" />
            </Avatar> */}
            <TextContainer>
              <Title>Total categories</Title>
              <SubTitle>ABC Holdings</SubTitle>
            </TextContainer>
          </Info>
          <Container>
            <Badge content="Categories" paid />
            <Price>- {categoryList?.length}</Price>
          </Container>
        </Invoice>
        <Invoice>
          <Info>
            {/* <Avatar>
              <img src='' alt="" />
            </Avatar> */}
            <TextContainer>
              <Title>Blogs</Title>
              <SubTitle>Inchor Associates</SubTitle>
            </TextContainer>
          </Info>
          <Container>
            <Badge content="Late" late />
            <Price>$ 1,200.87</Price>
          </Container>
        </Invoice>
      </CardContent>
    </InvoicesContainer>
  );
}

const InvoicesContainer = styled.div`
  width: 35rem;
  border-radius: 1rem;
  margin-top: 2rem;
  background-color: white;
  height: 215%;
  box-shadow: ${cardShadow};
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const CardContent = styled.div`
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    margin: 2rem 0;
  }
`;
const Invoice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0.4rem;
  padding-top: 0.6rem;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  width: 50%;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
`;
const Avatar = styled.div`
  img {
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 3.5rem;
  }
`;
const TextContainer = styled.div`
  margin-left: 1rem;
`;
const Title = styled.h4``;
const SubTitle = styled.h5`
  font-weight: 400;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 100%;
    flex-direction: column;
    gap: 0.6rem;
  }
`;

const Price = styled.div`
color:blue
font:bold
`;

export default Invoices;