import { createAsyncThunk, createSlice,createAction } from "@reduxjs/toolkit";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";



//Create Post action
//action to redirect
const resetPost=createAction('category/reset')
export const createpostAction = createAsyncThunk(
  "post/created",
  async (post, { rejectWithValue, getState, dispatch }) => {
    console.log(post)
    //get user action
    const user=getState()?.users;
    const {userAuth}=user;
    const config={
        headers:{
            Authorization:`Bearer ${userAuth?.token}`,
        }
    };

   try {
    //http call
    const formData=new FormData();
    formData.append('title', post?.title);
    formData.append('description', post?.description);
    formData.append('category', post?.category);
    formData.append('image', post?.image);
    console.log(formData,post)
    const {data}=await axios.post(`${baseUrl}/api/posts`,formData,config);
    return data
   } catch (error) {
    if(!error?.response) throw  error;
    return rejectWithValue(error?.response?.data)
   }


  }
);

//slice
const postSlice=createSlice({
    name:'post',
    initialState:{},
    extraReducers:(builder)=>{
        builder.addCase(createpostAction.pending,(state,action)=>{
            state.loading=true;
        });
        builder.addCase(createpostAction.fulfilled,(state,action)=>{
            state.postCreated=action?.payload;
            state.loading=false;
            state.appErr=undefined;
            state.serverErr=undefined
        });
        builder.addCase(createpostAction.rejected,(state,action)=>{
            state.loading=false;
            state.appErr=action?.payload?.message;
            state.serverErr=action?.error?.message;
        })
    }
});

export default postSlice.reducer;
