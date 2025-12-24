import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { articleService } from "../../service/articleService";

const initialState = {
  list: [],
  loading: 0,
};

export const getArticles = createAsyncThunk("scpArticles/getArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await articleService.getAllArticle();
    return response;
  } catch (error) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.list = [];
        state.loading += 1;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading -= 1;
      })
      .addCase(getArticles.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default articlesSlice.reducer;
