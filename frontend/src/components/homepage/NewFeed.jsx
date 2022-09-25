import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction, toggleAddLikeToPost,toggleAddDisLikeToPost } from "../../redux/slices/posts/postSlices";
import {Button, Card,CardBody, CardImg,CardText} from 'reactstrap'
import * as DOMPurify from 'dompurify';

import DateFormatter from "../../utils/DateFormatter";
import ReactPaginate from 'react-paginate'
import LoadingComponent from "../../utils/LoadingComponent";
import {
  Row,
  Col,
  
  Container,
} from "reactstrap";
import PostCard from "../Posts/PostCard";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api_instance";
import { EyeIcon, ThumbDownIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { fetchCategoriesAction } from "../../redux/slices/category/categorySlice";

function NewFeed() {
//const [color,setColor]=useState({color:'gray'})
  //select post from store
  const post = useSelector((state) => state?.post);
  const user=useSelector((state)=> state?.users)
  const {userAuth}=user
  const { postLists,hasMore,pageNumber, loading, appErr, serverErr, likes, dislikes } = post;
  console.log(postLists);
  const blogsPerPage=10;
  const pagesVisited=pageNumber * blogsPerPage
  const pageCount=Math.ceil( [postLists].length/blogsPerPage)
  console.log(pageCount);
  
  const navigate=useNavigate()
  const dispatch = useDispatch();
  useEffect(() => {
    //load all the posts from server
    if(userAuth){

      dispatch(fetchPostsAction(""));
    }else{
      navigate('/login')
    }
    
  }, [dispatch,likes,dislikes,navigate]);

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);
  //const refresh=(postLists)=>{}
  
  
  const category = useSelector(state => state?.category);
  //console.log(category)
  const {
    categoryList,
    loading: catLoading,
    appErr: catAppErr,
    serverErr: catServerErr,
  } = category;
  
  
  const handlePageClick=({selected:selectedPage})=>{
   
   pageNumber(selectedPage)
  }

  if(!userAuth) return <Navigate to='/login' />
  return (
    
    <>
   
  
  
<section >
    {/* <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200"><path fill=" #F5FFFA" fill-opacity="1" d="M0,128L60,144C120,160,240,192,360,192C480,192,600,160,720,144C840,128,960,128,1080,138.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path></svg> */}
        <div class="py-20 bg-white min-h-screen radius-for-skewed">
          <div class="container mx-auto px-4">
            <div class="mb-16 flex flex-wrap items-center">
              <div class="w-full lg:w-1/2">
                <span class="text-indigo-600 font-bold">
                  See Posts from our Awesome Developers
                </span>
                
                <h2 class="text-4xl text-gray-300 lg:text-5xl font-bold font-heading">
                 Tricks To Write a Better Code.
                </h2>
                
              </div>
                {/* View All */}
              <div class=" block text-right w-1/2 ">
                <button onClick={()=>dispatch(fetchPostsAction(""))} class="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-purple-500 hover:to-yellow-500 ... text-gray-50 font-bold leading-loose transition duration-200 ">
                  View All Posts 
                  
                </button>

              </div>
            </div>
            <div class="flex flex-wrap -mx-3">
              <div class="mb-8 lg:mb-0 w-full lg:w-1/4 px-3">
                <div class="py-4 px-6 bg-zinc-100 shadow rounded">
                  <h4 class="mb-4 text-blue-500 font-bold uppercase">
                    Categories
                  </h4>
                  <ul className="overflow-auto h-90">
                  {catLoading ? (
                      <LoadingComponent />
                    ) : catAppErr || catServerErr ? (
                      <h1>
                        {catServerErr} {catAppErr}
                      </h1>
                    ) : categoryList?.lenght <= 0 ? (
                      <h1 className="animate-bounce text-indigo-600 text-center">No Category Found</h1>
                    ) : (
                      categoryList?.map(category => (
                        <li>
                          <p onClick={()=>dispatch(fetchPostsAction(category?.title) )} className="block cursor-pointer py-2 px-3 mb-4 rounded text-white font-bold bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-purple-500 hover:to-cyan-500 ...">
                           
                          {category?.title} 
                      
                          </p>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
              <div class="w-full lg:w-3/4 px-3 ">
                {/* Post goes here */}

                { 
                  
               appErr || serverErr ? (
                  <h1>Err</h1>
                ) : postLists?.length <= 0 ? (
                  <h1 className="animate-bounce text-indigo-600 text-center">No Post Found</h1>
                ) : (
                  postLists?.map(post => (
                    <div key={post.id} class="flex flex-wrap mx-3  lg:mb-6">
                      <div class=" m w-full lg:w-1/4 ">
                        
                          <div  >
                          <img
                            class="w-96 h-full object-cover  rounded"
                            src={post?.image}
                            alt=""
                          />
                         </div>
                        
                        {/* Likes, views dislikes */}
                        <div className="flex flex-shrink py-2 bg-blue-50 ">
                          {/* Likes */}
                          <div className="flex flex-row justify-center items-center  px-2   pt-2">
                            {/* Togle like  */}
                            <div className="">
                              <ThumbUpIcon onClick={()=> dispatch(toggleAddLikeToPost(post?._id))} className="h-7 w-7 text-gray-400 cursor-pointer" />
                            </div>
                            <div className="pl-2 text-gray-900">
                              {post?.likes?.length ? post?.likes?.length : 0}
                            </div>
                          </div>
                          {/* Dislike */}
                          <div className="flex flex-row  justify-center items-center px-2   pt-2">
                            <div>
                              <ThumbDownIcon onClick={()=>dispatch(toggleAddDisLikeToPost(post?._id))} className="h-7 w-7 cursor-pointer text-gray-400" />
                            </div>
                            <div className="pl-2 text-gray-900">
                              {post?.disLikes?.length
                                ? post?.disLikes?.length
                                : 0}
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
                      </div>


                                  {/* User Avatar */}
                        <div className="mx-10 flex items-center my-5">
                          <div className="flex-shrink-0">
                            <div>
                              <img
                                className="h-10 w-10 rounded-full"
                                src={post?.user?.profilePhoto}
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              <Link to={`/profile/${post?.user?._id}`} className="text-gray-500 hover:underline ">
                                {post?.user?.firstName} {post?.user?.lastName}
                              </Link>
                            </p>
                            <div className="flex space-x-1 text-sm text-gray-500">
                              <time>
                                <DateFormatter date={post?.createdAt} />
                              </time>
                              <span aria-hidden="true">&middot;</span>
                            </div>
                          </div>
                        </div>

                      <div class="w-full lg:w-3/4 px-3">
                            {/* {capitalizeWord(post?.title)} */}
                        <div class="hover:underline mt-2">
                          <h3 class="mb-1 my-5 text-2xl text-indigo-600 font-bold font-heading">
                                {post?.title}  ({post?.category})

                          </h3>
                        </div>
                        <div className="text-zinc-500" dangerouslySetInnerHTML={{__html:DOMPurify.sanitize(post.description.substring(0,200))}}>
                {/* {post.description.substring(0,60)}... */}
            </div>
                        <Link to={`/post-details/${post?.id}`} className="text-indigo-500 hover:underline py-5">
                          Read More..
                        </Link>
                      
                        {/* <p class="text-gray-900">{post?.description}</p> */}
                        {/* Read more */}
                        


                        
                      </div>
                    </div>
                  ))
                )}
        
      <ReactPaginate 
              previousLabel={'Previous'}
              nextLabel={'Next'}

            pageCount={pageCount}
           onPageChange={handlePageClick}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
            />
              </div>
            </div>
          </div>
        </div>
        
      </section>



      <div className="container-fluid">
 
      
      
        
          

         

          
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

         

                   
        
    </div>
    </>
    
  );
}

export default NewFeed;
