import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchPostsAction,
  toggleAddLikeToPost,
  toggleAddDisLikeToPost,
} from "../../redux/slices/posts/postSlices";
import { Button, Card, CardBody, CardImg, CardText } from "reactstrap";
import * as DOMPurify from "dompurify";

import DateFormatter from "../../utils/DateFormatter";
import ReactPaginate from "react-paginate";
import LoadingComponent from "../../utils/LoadingComponent";
import { Row, Col, Container } from "reactstrap";
import PostCard from "../Posts/PostCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api_instance";
import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";





function NewFeed() {
  const [search,setSearch]=useState('')
  //select post from store
  const post = useSelector((state) => state?.post);
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;
  const {
    postLists,
    hasMore,
    pageNumber,
    loading,
    appErr,
    serverErr,
    likes,
    dislikes,
  } = post;
  console.log(postLists);
  const blogsPerPage = 10;
  const pagesVisited = pageNumber * blogsPerPage;
  const pageCount = Math.ceil([postLists].length / blogsPerPage);
  console.log(pageCount);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    //load all the posts from server
    if (userAuth) {
      dispatch(fetchPostsAction(""));
    } else {
      navigate("/login");
    }
  }, [dispatch, likes, dislikes, navigate]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //const refresh=(postLists)=>{}

  const category = useSelector((state) => state?.category);
  //console.log(category)
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;

  const handlePageClick = ({ selected: selectedPage }) => {
    pageNumber(selectedPage);
  };

  if (!userAuth) return <Navigate to="/login" />;
  return (
    <>
     
      <section>
        {/* <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill=" #F5FFFA" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,192C480,192,600,160,720,144C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg> */}
        <div class=" bg-white min-h-screen radius-for-skewed">
          <div class="container mx-auto mt-4 ">
            
          <div className="flex justify-center  mt-3 sticky top-20  z-50">
            <div className="flex border border-gray-300 rounded">
                <input onChange={(event)=>{
                  setSearch(event.target.value)
                }}
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button className="px-4 text-white bg-blue-600 border-l rounded ">
                    Search
                </button>
            </div>
        </div>

            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3 ">
                <div class="mt-5  bg-blue-50 shadow rounded  pr-7  items-center md:fixed">
                  {/* <h4 class="py-4 text-blue-500 font-serif text-center">
                    Categories
                  </h4> */}
                  <ul className="overflow-auto h-90">
                    {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.lenght <= 0 ? (
                      <h1 className="animate-bounce text-indigo-600 text-center">
                        No Category Found
                      </h1>
                    ) : (
                      categoryList?.map((category) => (
                        <li>
                          <p
                            onClick={() =>
                              dispatch(fetchPostsAction(category?.title))
                            }
                            className="block cursor-pointer mt-3  p-2 rounded-sm text-white text-center font-mono bg-indigo-700 hover:bg-indigo-800 "
                          >
                            {category?.title}
                          </p>
                        </li>
                      ))
                    )}
                <div class=" block  w-full my-3 ">
                  <button
                    onClick={() => dispatch(fetchPostsAction(""))}
                    class="inline-block mt-2 py-1 px-6 rounded-3xl  bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-purple-500 hover:to-pink-500 ... text-gray-50 font-bold leading-loose transition duration-200 "
                  >
                    View All Posts
                  </button>
                </div>
                  </ul>
                </div>
               
              </div>
              
            </div>



            {/* <div className="flex grid grid-cols-2"> */}

            <div className="w-full  py-[10rem]-sticky  my-3  bg-white">
              <div className="max-w-[700px]  mx-auto grid md:grid-cols-1 gap-8">

              { 
                  
                  appErr || serverErr ? (
                     <h1>Err</h1>
                   ) : postLists?.length <= 0 ? (
                     <h1 className="animate-bounce text-indigo-600 text-center">No Post Found</h1>
                   ) : (postLists?.filter((val)=>{
                    if(search===''){
                      return val
                    }else if(val.title.toLowerCase().includes(search.toLocaleLowerCase())){
                      return val
                    }
                   })?.map((post) => (
                  <div className="w-full shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300">
                    
                    <div className="my-3 flex">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />

                            <p className="text-xl font-serif  px-3">
                              <Link
                                to={`/profile/${post?.user?._id}`}
                                className="text-gray-700 hover:underline "
                              >
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                              
                            </p>


                      </div>
                    

                    <img
                      className="w-full h-50 mx-auto  bg-white object-cover"
                      src={post?.image}
                      alt="/"
                    />

                    <div className="flex  py-2 bg-white shadow-sm w-full item-center">
                      {/* Likes */}
                      <div className="flex flex-row justify-center items-center  px-2   pt-2">
                        {/* Togle like  */}
                        <div className="">
                          <ThumbUpIcon
                            onClick={() =>
                              dispatch(toggleAddLikeToPost(post?._id))
                            }
                            className="h-7 w-7 text-gray-400 cursor-pointer"
                          />
                        </div>
                        <div className="pl-2 text-gray-900">
                          {post?.likes?.length ? post?.likes?.length : 0}
                        </div>
                      </div>
                      {/* Dislike */}
                      <div className="flex flex-row  justify-center items-center px-2   pt-2">
                        <div>
                          <ThumbDownIcon
                            onClick={() =>
                              dispatch(toggleAddDisLikeToPost(post?._id))
                            }
                            className="h-7 w-7 cursor-pointer text-gray-400"
                          />
                        </div>
                        <div className="pl-2 text-gray-900">
                          {post?.disLikes?.length ? post?.disLikes?.length : 0}
                        </div>
                      </div>
                      {/* Views */}
                      <div className="flex flex-row justify-center items-center px-2   pt-2">
                        <div>
                          <EyeIcon className="h-7 w-7  text-gray-400 " />
                        </div>
                        <div className="pl-2 text-gray-900">
                          {post?.numViews}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-2xl font-serif text-center mt-5">
                      {post?.title} ({post?.category})
                    </h2>

                    <div
                          className="text-zinc-500"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(
                              post.description.substr(0,1000)
                            ),
                          }}
                        ></div>
                        
                    <div >
                    <p className=" text-sm font-serif">
                      <time className=" text-gray-500  ml-5 justify-end">
                                <DateFormatter date={post?.createdAt} />
                              </time></p>
                    </div>
                    <button className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-500 ... w-[200px] rounded-md font-medium my-3 mx-auto  py-2">
                    <Link
                          to={`/post-details/${post?.id}`}
                          className="text-white "
                        >
                          Read More
                        </Link>
                    </button>
                    
                  </div>
                )))}
              </div>
            </div>
           {/*  */}
          </div>
        </div>
      </section>




       {/* <ReactPaginate 
              previousLabel={'Previous'}
              nextLabel={'Next'}

            pageCount={pageCount}
           onPageChange={handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            /> */}

      {/* <div className="container-fluid"> */}
      {/* {appErr || serverErr ? (
            <h1 className="text-yellow-600 text-center text-lg ">
              {serverErr} {appErr}
            </h1>
          ) : postLists?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">
              No Post Found
            </h1>
          ) : (
            postLists?.slice(pagesVisited,pagesVisited+blogsPerPage).map((post) => (
              <div>
                <PostCard post={post} key={post.id} />
              </div>
            ))
          )} */}
      {/* </div> */}
    </>
  );
}

export default NewFeed;
