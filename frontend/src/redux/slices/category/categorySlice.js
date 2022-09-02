import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../../utils/api_instance";
import baseUrl from "../../../utils/baseUrl";


//action

export const createCategoryAction = createAsyncThunk(
  "category/create",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
      const { data } = await axiosInstance.post(
        `/api/category`,
        {
          title: category?.title,
        },
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

//fetch all action
export const fetchCategoriesAction = createAsyncThunk(
  "category/fetch",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `/api/category`,
        config,
        category
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

//update category
export const updateCategoriesAction = createAsyncThunk(
  "category/update",
  async (category, { rejectWithValue, getState, dispatch }) => {
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
        `/api/category/${category?.id}`,
        { title: category?.title },
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

//delete category
export const deleteCategoriesAction = createAsyncThunk(
  "category/delete",
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
      const { data } = await axiosInstance.delete(
        `/api/category/${id}`,
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

//fetch category details
export const fetchCategoryAction = createAsyncThunk(
  "category/details",
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
      const { data } = await axiosInstance.get(`/api/category/${id}`, config);
      return data;
    } catch (error) {
      if (!error?.response) {
        throw error;
      }
      return rejectWithValue(error?.response?.data);
    }
  }
);

//slices
//create
const categorySlice = createSlice({
  name: "category",
  initialState: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createCategoryAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCategoryAction.fulfilled, (state, action) => {
      state.category = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });

    builder.addCase(createCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
    //fetch all categories
    builder.addCase(fetchCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoriesAction.fulfilled, (state, action) => {
      state.categoryList = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //update categories
    builder.addCase(updateCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updateCategoriesAction.fulfilled, (state, action) => {
      state.updateCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(updateCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //delete categories
    builder.addCase(deleteCategoriesAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deleteCategoriesAction.fulfilled, (state, action) => {
      state.deleteCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(deleteCategoriesAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });

    //fetch single category details
    builder.addCase(fetchCategoryAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchCategoryAction.fulfilled, (state, action) => {
      state.fetchCategory = action?.payload;
      state.loading = false;
      state.appErr = undefined;
      state.serverErr = undefined;
    });
    builder.addCase(fetchCategoryAction.rejected, (state, action) => {
      state.loading = false;
      state.appErr = action?.payload?.message;
      state.serverErr = action?.error?.message;
    });
  },
});

export default categorySlice.reducer;
