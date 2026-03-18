import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { scpService } from "@/service/scpService";
import { articleService } from "@/service/articleService";
import { categoryService } from "@/service/categoryService";

export const getCombinedDbData = createAsyncThunk("combinedDb/combinedDbData", async (params, { rejectWithValue }) => {
  try {
    const article = await articleService.getAllArticle();
    const scp = await scpService.getAllScp();
    const category = await categoryService.getAllCategory();

    const allFetch = [
      {
        name: "Статьи",
        link: "articles",
        tableArticle: article,
      },
      {
        name: "Scp объекты",
        link: "scps",
        tableScp: scp,
      },
      {
        name: "Категории",
        link: "categories",
        tableCategory: category,
      },
    ];

    return allFetch;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  data: [],
  loading: 0,
};

export const combinedDbSlice = createSlice({
  name: "combinedDb",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCombinedDbData.pending, (state) => {
        state.data = [];
        state.loading += 1;
      })
      .addCase(getCombinedDbData.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading -= 1;
      })
      .addCase(getCombinedDbData.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default combinedDbSlice.reducer;
