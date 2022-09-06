import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsAction } from "../../redux/slices/posts/postSlices";
import DateFormatter from "../../utils/DateFormatter";
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import {
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Container,
} from "reactstrap";
import PostCard from "../Posts/PostCard";

function NewFeed() {
 

  //select post from store
  const post = useSelector((state) => state?.post);
  const { postLists,totalPages,hasMore, loading, appErr, serverErr, likes, dislikes } = post;
  console.log(postLists);
  const dispatch = useDispatch();

  
 
 

  useEffect(() => {
    //load all the posts from server
    dispatch(fetchPostsAction(""));
  
  }, [dispatch]);

 //const refresh=(postLists)=>{}



  return (
    // <InfiniteScroll 
    // dataLength={postLists.length}
    // next={()=>{
    //   dispatch(fetchPostsAction())
    // }}
    // hasMore={hasMore}
    // loader={<h4>Loading...</h4>}
    // endMessage={
    //   <p style={{ textAlign: "center" }}>
    //     <b>Yay! You have seen it all</b>
    //   </p>
    // }
    // >
    
    <div className="container-fluid">

      
      <Row>
        <Col
          md={{
            size: 10,
            offset: 1,
          }}
        >
          {/* <h1>Blogs </h1> */}

         

          
          {appErr || serverErr ? (
            <h1 className="text-yellow-600 text-center text-lg ">
              {serverErr} {appErr}
            </h1>
          ) : postLists?.length <= 0 ? (
            <h1 className="text-yellow-400 text-lg text-center">
              No Post Found
            </h1>
          ) : (
            postLists?.map((post) => (
              <div>
                <PostCard post={post} key={post.id} />
              </div>
            ))
          )}


          {/* <Container className="mt-3">
            <Pagination size="md">
              <PaginationItem onClick={()=> changePage(postLists.pageNumber-1)} disabled ={postLists?.pageNumber==0}>
                <PaginationLink previous>
                  previous
                </PaginationLink>
              </PaginationItem>

                {
                  [...Array(postLists?.totalPages)].map((item,index)=>(
                    <PaginationItem onClick={()=>changePage(index)} active={index==postLists?.pageNumber} >
                      <PaginationLink >
                        {index+1}
                      </PaginationLink>
                    </PaginationItem>
                  ))
                }


              <PaginationItem onClick={()=>changePage(postLists.pageNumber+1)} disabled={postLists?.lastPage}>
                <PaginationLink next>
                  Next
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </Container> */}
          
        </Col>
      </Row>
    </div>
    //  </InfiniteScroll> 
  );
}

export default NewFeed;
