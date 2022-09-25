import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsersAction } from "../../../redux/slices/users/usersSlice";
import LoadingComponent from "../../../utils/LoadingComponent";
import UsersListHeader from "./UsersListHeader";
import UsersListItem from "./UsersListItem";

const UsersList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllUsersAction());
  }, []);

  //data from store
  const users = useSelector((state) => state?.users);
  const { usersList, loading, appErr, serverErr } = users;
  return (
    <>
      <section class="py-8 bg-gray-900 min-h-screen">
        {loading ? (
          <LoadingComponent />
        ) : appErr || serverErr ? (
          <h3>
            {appErr} {serverErr}
          </h3>
        ) : usersList?.length <= 0 ? (
          <h2>No User Found</h2>
        ) : (
          usersList?.map((user) => (
            <>
              <UsersListItem user={user} />
            </>
          ))
        )}
      </section>
    </>
  );
};

export default UsersList;
