import React from "react";
import { Link, useParams } from "react-router-dom";
import { MailIcon } from "@heroicons/react/solid";
import { blockUserAction, unBlockUserAction } from "../../../redux/slices/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";

const UsersListItem = user => {
   
    const dispatch=useDispatch()
  return (
    <>
      <div className="p-8 mb-4 bg-white shadow rounded">
        <div className="flex flex-wrap items-center -mx-4">
          <div className="w-full lg:w-3/12 flex px-4 mb-6 lg:mb-0">
            <img
              className="w-10 h-10 mr-4 object-cover rounded-full"
              src={user?.user?.profilePhoto}
              alt="profile "
            />
            <div>
              <p className="text-lg font-serif ">{user?.user?.firstName} {user?.user?.lastName}</p>
              <p className="text-lg font-serif  text-gray-500">{user?.user?.email}</p>
            </div>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="py-1 px-2 text-xs text-purple-500 bg-purple-50 rounded-full">
              {user?.user?.accountType}
              {/* <span>{user?.user?.isBlocked && "Blocked"}</span> */}
            </p>
          </div>
          <div className="w-1/2 lg:w-2/12 px-4 mb-6 lg:mb-0">
            <p className="text-lg font-serif ">
              <span className="text-base mr-2    text-yellow-500">
                {user.user?.followers?.length}
              </span>
              followers
            </p>
          </div>
          <div className="w-full flex lg:w-4/12 px-4 justify-around mb-6 lg:mb-0">
            <p className="  px-2 mr-2  lg:mb-0 text-lg font-serif   ">
              <span className="text-base mr-2  boder-2   text-blue-600">
                {user.user?.posts?.length} - Posts
              </span>
            </p>
            <Link
              to={`/profile/${user?.user?._id}`}
              className=" text-blue-600  py-1 px-2 text-center mr-2 mb-1 lg:mb-0 text-lg font-serif    hover:bg-blue-500 hover:text-white"
            >
             Profile
            </Link>

            {user?.user?.isBlocked ? (
              <button
                 onClick={() => dispatch(unBlockUserAction(user?.user?._id))}
                className=" py-1 px-2 text-center bg-blue-500 text-blue-600 mr-2 mb-1 lg:mb-0 text-lg font-serif  "
              >
                unblock
              </button>
            ) : (
              <button
                onClick={() => dispatch(blockUserAction(user?.user?._id))}
                className=" py-1 px-2 text-center hover:bg-blue-600 text-red-500 mr-2 mb-1 lg:mb-0 text-lg font-serif  "
              >
                Block
              </button>
            )}

            <Link
              to='/send-email'
              state={{email:user?.user?.email,
                id:user?.user?.id
            }}
              className="  justify-center  px-2     shadow-sm text-sm font-serif  text-gray-700  hover:bg-indigo-300 "
            >
              {/* <MailIcon
                className="-ml-1 mr-2 h-5 w-5  text-white"
                aria-hidden="true"
              /> */}
              <span className="text-base mr-2  text-bold text-blue">
                Message
              </span>
            </Link>
          </div>
          <div className="w-full lg:w-1/12 px-4">
            <div className="flex items-center">
              {/* Send Mail */}
              <div></div>
            </div>
          </div>
        </div>
      </div>



      
    </>
  );
};

export default UsersListItem;