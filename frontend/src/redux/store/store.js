import {configureStore} from '@reduxjs/toolkit'
import usersReducer from '../slices/users/usersSlice';
import categoryReducer from '../slices/category/categorySlice';
import postReducer from '../slices/posts/postSlices';
import commentReducer from '../slices/comments/commentSlices';
import sendMailReducer from '../slices/email/emailSlice'
import accVerificationReducer from '../slices/accountVerification/accVerificationSlice';

const store=configureStore({
    reducer:{
      users:usersReducer,
      category:categoryReducer,
      post:postReducer,
      comment:commentReducer,
      sendMail:sendMailReducer,
      accountVerification:accVerificationReducer,

    },
});

export default store;