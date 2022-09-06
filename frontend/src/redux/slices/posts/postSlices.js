import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";

//Create Post action
//action to redirect
const resetPost = createAction("category/reset");
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

//fetch all posts
export const fetchPostsAction = createAsyncThunk(
  "post/list",
  async (category, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(
        `${baseUrl}/api/posts?category=${category}&skip=0`
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

    //fetch posts
    builder.addCase(fetchPostsAction.pending,(state,action)=>{
      state.loading=true;
      
    });
    builder.addCase(fetchPostsAction.fulfilled,(state,action)=>{
      
      state.postLists=action?.payload;      
      state.loading=false;
      state.hasMore=true;
      state.pages=1
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
  },
});

export default postSlice.reducer;
