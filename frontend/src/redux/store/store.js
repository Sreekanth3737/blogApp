import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice';
import categoryReducer from '../slices/category/categorySlice';
import postReducer from '../slices/posts/postSlices';

const store=configureStore({
    reducer:{
      users:usersReducer,
      category:categoryReducer,
      post:postReducer
    },
});

export default store;