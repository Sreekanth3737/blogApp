import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";

import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import instance from "../../../utils/api_instance";
import axiosInstance from "../../../utils/api_instance";


const resetUserAction=createAction("user/profile/reset")
//register action

export const registerUserAction = createAsyncThunk(
  "users/register",
  async (user, { rejectWithValue, getState, dispatch }) => {
    try {
      //http call
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${baseUrl}/api/users/register`,
        user,
        config
      );

      return data;
    } catch (error) {
      if (!error && !error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Login
export const loginUserAction = createAsyncThunk(
  "user/login",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    const config = {
      headers: {
        "content-Type": "application/json",
      },
    };
    try {
      //make http call
      const { data } = await axios.post(
        `${baseUrl}/api/users/login`,
        userData,
        config
      );

      //save user into local storage
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//profile
export const userProfileAction = createAsyncThunk(
  "user/profile",
  async (id, { rejectWithValue, getState, dispatch }) => {
    //get  user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    //http call

    try {
      const { data } = await axiosInstance.get(
        `/api/users/profile/${id}`,

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Follow
export const usersFollowAction = createAsyncThunk(
  "user/follow",
  async (userToFollowId, { rejectWithValue, getState, dispatch }) => {
    //get  user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    //http call

    try {
      const { data } = await axiosInstance.put(
        `/api/users/follow`,{followId:userToFollowId},

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//unFollow
export const unFollowAction = createAsyncThunk(
  "user/unfollow",
  async (unFollowId, { rejectWithValue, getState, dispatch }) => {
    //get  user token
    const user = getState()?.users;
    const { userAuth } = user;

    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    //http call

    try {
      const { data } = await axiosInstance.put(
        `/api/users/unfollow`,{unFollowId},

        config
      );
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);


//update profile
export const updateUserAction = createAsyncThunk(
  "users/update",
  async (userData, { rejectWithValue, getState, dispatch }) => {
    //get  user token
    const user = getState()?.users;
    const { userAuth } = user;

    //http call
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };

    //http call
    try {
      const { data } = await axios.put(
        `${baseUrl}/api/users`,
        {
          firstName: userData?.firstName,
          lastName: userData?.lastName,
          bio: userData?.bio,
          email: userData?.email,
        },
        config
      );
        //dispatch
        dispatch(resetUserAction())
      return data;
    } catch (error) {
      if (!error && !error.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch User details
export const fetchUserDetailsAction = createAsyncThunk(
  "user/detail",
  async (id, { rejectWithValue, getState, dispatch }) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/users/${id}`);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//fetch all Users
export const fetchAllUsersAction = createAsyncThunk(
  "all/users",
  async (id, { rejectWithValue, getState, dispatch }) => {

    const user = getState()?.users;
    const { userAuth } = user;

    
    const config = {
      headers: {
        Authorization: `Bearer ${userAuth?.token}`,
      },
    };


    try {
      const { data } = await axios.get(`${baseUrl}/api/users`,config);
      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);


//Logout action
export const logoutAction = createAsyncThunk(
  "/user/logout",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      localStorage.removeItem("userInfo");
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//Create Post action
export const uploadProfilePhotoAction = createAsyncThunk(
  "user/profile-photo",
  async (userImg, { rejectWithValue, getState, dispatch }) => {
    console.log(userImg);
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

      formData.append("image", userImg?.image);
      console.log(formData, userImg);
      const { data } = await axios.put(
        `${baseUrl}/api/users/profilephoto-upload`,
        formData,
        config
      );

      return data;
    } catch (error) {
      if (!error?.response) throw error;
      return rejectWithValue(error?.response?.data);
    }
  }
);

//get user from local storage and place into store

const userLoginFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
//slices

const userSlices = createSlice({
  name: "users",
  initialState: {
    userAuth: userLoginFromStorage,
  },
  extraReducers: (builder) => {
    //register
    builder.addCase(registerUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.registered = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(registerUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //login
    builder.addCase(loginUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userAuth = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(loginUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //profile
    builder.addCase(userProfileAction.pending, (state, action) => {
      state.profileLoading = true;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(userProfileAction.fulfilled, (state, action) => {
      state.profileLoading = false;
      state.profile = action?.payload;
      state.profileAppErr = undefined;
      state.profileServerErr = undefined;
    });
    builder.addCase(userProfileAction.rejected, (state, action) => {
      state.profileLoading = false;
      state.profileAppErr = action?.payload?.message;
      state.profileServerErr = action?.error?.message;
    });

    //upload profile photo
    builder.addCase(uploadProfilePhotoAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.fulfilled, (state, action) => {
      state.loading = false;
      state.profilePhoto = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(uploadProfilePhotoAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //user- fetch user details
    builder.addCase(fetchUserDetailsAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchUserDetailsAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });


    // fetch All user
    builder.addCase(fetchAllUsersAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.fulfilled, (state, action) => {
      state.loading = false;
      state.usersList = action?.payload;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(fetchAllUsersAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

     //user follow
     builder.addCase(usersFollowAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(usersFollowAction.fulfilled, (state, action) => {
      state.loading = false;
      state.followed = action?.payload;
      state.unFollowed=undefined;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(usersFollowAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.unFollowed=undefined;
      state.serverError = action?.error?.message;
    });


    //user unfollow
    builder.addCase(unFollowAction.pending, (state, action) => {
      state.unfollowLoading = true;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(unFollowAction.fulfilled, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowed = action?.payload;
      state.followed = undefined;
      state.unFollowedAppErr = undefined;
      state.unfollowServerErr = undefined;
    });
    builder.addCase(unFollowAction.rejected, (state, action) => {
      state.unfollowLoading = false;
      state.unFollowedAppErr = action?.payload?.message;
      state.unfollowServerErr = action?.error?.message;
    });

    //update user profile
    builder.addCase(updateUserAction.pending, (state, action) => {
      state.loading = true;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(resetUserAction,(state,action)=>{
      state.isUpdated=true
    })
    builder.addCase(updateUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.userUpdated = action?.payload;
      state.isUpdated=false
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(updateUserAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
    });

    //logout
    builder.addCase(logoutAction.pending, (state, action) => {
      state.loading = true;
      // state.appErr=undefined
      // state.serverError=undefined
    });
    builder.addCase(logoutAction.fulfilled, (state, action) => {
      state.userAuth = undefined;
      state.loading = undefined;
      state.loading = false;
      state.appErr = undefined;
      state.serverError = undefined;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.appErr = action?.payload?.message;
      state.serverError = action?.error?.message;
      state.loading = false;
    });
  },
});

export default userSlices.reducer;
