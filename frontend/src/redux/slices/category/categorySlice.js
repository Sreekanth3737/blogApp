import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


//action


export const createCategoryAction=createAsyncThunk('category/create',(category,{rejectWithValue,getState,dispatch})=>{
    //http call
})