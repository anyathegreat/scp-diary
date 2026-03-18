import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { categoryService } from "@/service/categoryService";

export const getCategories = createAsyncThunk("categoryList/getCategories", async (_, { rejectWithValue }) => {
  try {
    return await categoryService.getAllCategory();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  list: [],
  loading: 0,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.list = [];
        state.loading += 1;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading -= 1;
      })
      .addCase(getCategories.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default categoriesSlice.reducer;
