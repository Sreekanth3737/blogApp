import React, { useEffect } from "react";
import styled from "styled-components";
import { IoStatsChart } from "react-icons/io5";
import { themeColor, hoverEffect } from "./utils/color";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlice";

function Earnings() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, [dispatch]);
  const users = useSelector((state) => state?.users);
  const { usersList, loading, appErr, serverErr, block, unBlock } = users;
  return (
    <EarningsCard>
      <CardContent>
        <Chart>
          <IoStatsChart />
        </Chart>
        <EarningsText>Total Users</EarningsText>
        <Earning>{usersList?.length}</Earning>
        <EarningsIncrease>+ 10% since last month</EarningsIncrease>
      </CardContent>
    </EarningsCard>
  );
}

const EarningsCard = styled.div`
  height: 100%;
  width: 17rem;
  background-color: ${themeColor};
  padding: 1rem;
  border-radius: 1rem;
  color: white;
  transition: 0.4s ease-in-out;
  &:hover {
    box-shadow: ${hoverEffect};
  }
  @media screen and (min-width: 320px) and (max-width: 1080px) {
    width: 80%;
  }
`;

const CardContent = styled.div`
  margin: 1rem;
`;

const Chart = styled.div`
  display: flex;
  justify-content: center;
  svg {
    height: 4rem;
    width: 4rem;
  }
`;

const EarningsText = styled.h3`
  text-align: center;
  font-weight: normal;
  padding: 0.4rem 0;
`;

const Earning = styled.h2`
  text-align: center;
`;

const EarningsIncrease = styled.h5`
  text-align: center;
  font-weight: normal;
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  border-radius: 2rem;
`;
export default Earnings;
