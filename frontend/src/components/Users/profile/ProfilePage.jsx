import React from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  HeartIcon,
  EmojiSadIcon,
  UploadIcon,
  UserIcon,
} from "@heroicons/react/outline";

import { MailIcon, EyeIcon } from "@heroicons/react/solid";
import {
  userProfileAction,
  usersFollowAction,
  unFollowAction,
} from "../../../redux/slices/users/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import DateFormatter from "../../../utils/DateFormatter";
import * as DOMPurify from "dompurify";
import LoadingComponent from "../../../utils/LoadingComponent";

const ProfilePage = () => {
  const { id } = useParams();
  //console.log(id)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //select user data from store
  const users = useSelector((state) => state.users);
  const {
    profile,
    profileLoading,
    profileAppErr,
    profileServerErr,
    followed,
    unFollowed,
    userAuth,
  } = users;
  //console.log(profile);

  useEffect(() => {
    dispatch(userProfileAction(id));
  }, [id, dispatch, followed, unFollowed]);

  //isLogin

  const isLoginUser = userAuth?._id === profile?._id;

  return (
    <>
      {profileLoading ? (
        <LoadingComponent />
      ) : profileAppErr || profileServerErr ? (
        <h2 className="text-red-500 text-2xl">
          {profileServerErr}
          {profileAppErr}
        </h2>
      ) : (
        <div className="container shadow py-5">
          <div className="relative h-96 rounded-b flex justify-center">
            <img
              src={profile?.profilePhoto}
              className="object-cover w-full h-full rounded-b"
              alt="cover"
            />
            <div className="absolute -bottom-6">
              <img
                src={profile?.profilePhoto}
                className="object-cover border-4 border-white w-40 h-40 rounded-full"
                alt="cover"
              />
            </div>
          </div>
          <div className="  my-5">
            <div className="text-center mt-6 text-3xl ">
              {profile?.firstName} {} {profile?.lastName}{" "}
              <div className="mt-3 border-gray-300  border-b-2"></div>
            </div>

            <span className="inline-flex items-center mx-5 px-3 mt-5  py-0.5 rounded-full text-sm font-medium bg-red-100 text-yellow-800">
              {profile?.accountType}
            </span>
            {profile?.isAccountVerified ? (
              <span className="inline-flex ml-2 items-center mt-5 mx-5 px-3 py-0.5  rounded-lg text-sm font-medium bg-green-600 text-gray-300">
                Account Verified
              </span>
            ) : (
              <span className="inline-flex ml-2 items-center mt-5 mx-5 px-3 py-0.5  rounded-lg text-sm font-medium bg-red-600 text-gray-300">
                Unverified Account
              </span>
            )}

            <p className="mx-5 my-3 text-lg">
              Date Joined:
              <DateFormatter date={profile?.createdAt} />{" "}
            </p>

            <p className="text-blue-600 mt-2 my-3 mx-5">
              {profile?.posts?.length} posts {profile?.followers?.length}{" "}
              followers {profile?.following?.length} following
            </p>

            <div className="flex items-center mx-5  mb-2">
              <EyeIcon className="h-5 w-5 " />
              <div className="pl-2">
                <span className="text-indigo-400 cursor-pointer ">
                  Number of viewers : {profile?.viewedBy?.length}
                </span>
              </div>
            </div>

            <div className=" ">
              {isLoginUser && (
                <div className=" mx-5">
                  <Link
                    to={`/upload-profile-photo/${profile?._id}`}
                    className="inline-flex justify-center w-48 px-4 mt-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <UploadIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    <span>Upload Photo</span>
                  </Link>
                </div>
              )}

              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {/* // Hide follow button from the same */}
                <div className="">
                  {!isLoginUser && (
                    <div>
                      {profile?.isFollowing ? (
                        <button
                          onClick={() => dispatch(unFollowAction(id))}
                          className="mr-2 inline-flex justify-center mx-5 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <EmojiSadIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Unfollow</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => dispatch(usersFollowAction(id))}
                          type="button"
                          className="inline-flex justify-center mx-5 px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        >
                          <HeartIcon
                            className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span>Follow </span>
                          <span className="pl-2">
                            {profile?.followers?.length}
                          </span>
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Update Profile */}

                {isLoginUser && (
                  <Link
                    to={`/update-profile/${profile?._id}`}
                    className="inline-flex justify-center mx-5 px-4 py-2  shadow-sm text-sm font-medium rounded-md text-gray-700 bg-indigo-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <UserIcon
                      className="-ml-1 mr-2 h-5 w-5 text-white"
                      aria-hidden="true"
                    />
                    <span className="text-white">Update Profile</span>
                  </Link>
                )}

                {/* Send Mail */}
{userAuth?.isAdmin && (

                <Link
                  to="/send-email"
                  state={{
                    email: profile?.email,
                    id: profile?.id,
                  }}
                  className="inline-flex justify-center mx-5 px-4 py-2  shadow-sm text-sm font-medium rounded-md text-gray-700 bg-indigo-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  <MailIcon
                    className="-ml-1 mr-2 h-5 w-5 text-white"
                    aria-hidden="true"
                  />
                  <span className="text-base  text-center text-bold text-white">
                    Send Message
                  </span>
                </Link>
)}

              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center place-items-start flex-wrap  md:mb-0 my-5">
        <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
          <h1 className="text-center text-lg border-indigo-600 my-5 border-b-2">
            Who viewed my profile : {profile?.viewedBy?.length}
          </h1>

          {/* Who view my post */}
          <ul className="">
            {profile?.viewedBy?.length <= 0 ? (
              <h1>No Viewers</h1>
            ) : (
              profile?.viewedBy?.map((user) => (
                <li>
                  <div>
                    <div className="flex mb-2 items-center space-x-4 lg:space-x-6">
                      <img
                        className="w-16 h-16 rounded-full lg:w-20 lg:h-20"
                        src={user?.profilePhoto}
                        alt={user?.firstName}
                      />
                      <div className="font-serif text-lg leading-6 space-y-1">
                        <h3>
                          {user?.firstName} {user?.lastName}
                        </h3>
                        <p className="text-indigo-600">{user?.accountType}</p>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        {/* All my Post */}
        <div className="w-full md:w-2/3 px-4 mb-4 md:mb-0">
          <h1 className="text-center text-lg border-indigo-600 my-5 border-b-2">
            My Post - {profile?.posts?.length}
          </h1>
          {/* Loo here */}
          {profile?.posts?.length <= 0 ? (
            <h2 className="text-center text-xl animate-bounce">
              {" "}
              No Post Found
            </h2>
          ) : (
            profile?.posts?.map((post) => (
              <div className="flex flex-wrap  -mx-3 mt-3  lg:mb-6">
                <div className="mb-2   w-full lg:w-1/4 px-3">
                  <div>
                    <img
                      className="object-cover h-300 w-full rounded"
                      src={post?.image}
                      alt="poster"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-3/4 px-3">
                  <Link to={`/post/${post?._id}`} className="hover:underline">
                    <h3 className="mb-1 text-2xl text-blue-600 font-bold font-heading">
                      {post?.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 truncate">
                    {/* {post?.description} */}
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post?.description).substr(0,1000),
                      }}
                    ></div>
                  </p>

                  <Link
                    className="text-indigo-500 hover:underline"
                    to={`/post-details/${post?._id}`}
                  >
                    {" "}
                    Read more
                  </Link>
                  <p className="text-gray-500 mb-5">
                    {<DateFormatter date={post?.createdAt} />}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
