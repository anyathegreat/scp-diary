import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { categoryService } from "../../service/categoryService";

export const getCategorys = createAsyncThunk("categoryList/getCategorys", async (_, { rejectWithValue }) => {
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

export const categoryAllSlice = createSlice({
  name: "categorys",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorys.pending, (state) => {
        state.list = [];
        state.loading += 1;
      })
      .addCase(getCategorys.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading -= 1;
      })
      .addCase(getCategorys.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default categoryAllSlice.reducer;
