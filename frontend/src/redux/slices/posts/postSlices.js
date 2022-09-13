import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../utils/api_instance";
import baseUrl from "../../../utils/baseUrl";


const resetPost = createAction("category/reset");
const resetPostEdit = createAction("post/reset");
const resetPostDelete = createAction("post/delete");

//Create Post action
export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user action
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      //http call
      const formData = new FormData();
      formData.append("title", post?.title);
      formData.append("description", post?.description);
      formData.append("category", post?.category);
      formData.append("image", post?.image);
      console.log(formData, post);
      const { data } = await axios.post(
        `${baseUrl}/api/posts`,
        formData,
        config
      );
       dispatch(resetPost())
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//update post


export const updatePostAction = createAsyncThunk(
  "post/updated",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post);
    //get user action
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      //http call
      
      const { data } = await axios.put(
        `${baseUrl}/api/posts/${post?.id}`,
        post,
        config
      );
      dispatch(resetPostEdit())
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//delete post


export const deletePostAction = createAsyncThunk(
  "post/delete",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    console.log(postId);
    //get user action
    const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    try {
      //http call
      
      const { data } = await axios.delete(
        `${baseUrl}/api/posts/${postId}`,        
        config
      );
       dispatch(resetPostDelete()) 
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);



//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}`
      );
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch post details
export const fetchPostDetailsAction=createAsyncThunk(
  "post/detail",
  async(id,{rejectWithValue,getState,dispatch})=>{
    try {
      const{data}=await axios.get(`${baseUrl}/api/posts/${id}`);
      return data
    } catch (error) {
      if(!error?.response)throw error;
      return rejectWithValue(error?.response?.data)
    }
  }
);

//add Likes to post
export const toggleAddLikeToPost=createAsyncThunk(
  'post/like',
 async(postId,{rejectWithValue,getState,dispatch})=>{

  const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const {data}=await axiosInstance.put(`/api/posts/likes`,{postId},config);
      return data
    } catch (error) {
      if(!error?.response)throw error;
      return rejectWithValue(error?.response?.data)
    }
 }
);


//add disLikes to post
export const toggleAddDisLikeToPost=createAsyncThunk(
  'post/dislike',
 async(postId,{rejectWithValue,getState,dispatch})=>{

  const user = getState()?.users;
    const { userAuth } = user;
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };
    try {
      const {data}=await axiosInstance.put(`/api/posts/dislikes`,{postId},config);
      return data
    } catch (error) {
      if(!error?.response)throw error;
      return rejectWithValue(error?.response?.data)
    }
 }
)


//slice
const postSlice = createSlice({
  name: "post",
  initialState: {},

    

  extraReducers: (builder) => {
    builder.addCase(createpostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPost,(state,action)=>{
        state.isCreated=true
    });
    builder.addCase(createpostAction.fulfilled, (state, action) => {
      state.postCreated = action?.payload;
      state.loading = false;
      state.isCreated=false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(createpostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //update post
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostEdit, (state, action) => {
      state.isUpdated = true;
    });
    
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.postUpdated= action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
      state.isUpdated = false;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });


    //delete post
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(resetPostDelete,(state,action)=>{
      state.isDeleted=true
    })
    
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.postDeleted= action?.payload;
      state.isDeleted=false
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
     
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });



    //fetch posts
    builder.addCase(fetchPostsAction.pending,(state,action)=>{
      state.loading=true;
      
    });
    builder.addCase(fetchPostsAction.fulfilled,(state,action)=>{
      
      state.postLists=action?.payload;      
      state.loading=false;
      state.hasMore=true;
      state.pageNumber=0
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch post Details
    builder.addCase(fetchPostDetailsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPostDetailsAction.fulfilled, (state, action) => {
      state.postDetails = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchPostDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //Likes
    builder.addCase(toggleAddLikeToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddLikeToPost.fulfilled, (state, action) => {
      state.likes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddLikeToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //disLikes
    builder.addCase(toggleAddDisLikeToPost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(toggleAddDisLikeToPost.fulfilled, (state, action) => {
      state.dislikes = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(toggleAddDisLikeToPost.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

  },
});

export const { reset } = postSlice.actions
export default postSlice.reducer;
