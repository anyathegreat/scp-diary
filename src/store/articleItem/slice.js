import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { articleService } from "../../service/articleService";
import { router } from "../../router";

export const getArticleItem = createAsyncThunk("articleItem/getArticleItem", async (articleId, { rejectWithValue }) => {
  try {
    const response = await articleService.getArticle(articleId);

    if (response?.length < 1) {
      router.navigate("../not-found");
      throw new Error("Объект не был найден");
    }

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addArticleItem = createAsyncThunk("articleItem/addArticleItem", async (params, { rejectWithValue }) => {
  try {
    const response = await articleService.addArticle(params);
    toast.success("Статья успешно созданна");
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addNotes = createAsyncThunk("articleItem/addNotes", async (params, { dispatch, rejectWithValue }) => {
  try {
    const response = await articleService.addArticleNotes(params);
    dispatch(getArticleItem(params.articleId));
    toast.success("Заметка успешно создана");

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteNotes = createAsyncThunk(
  "articleItem/deleteNotes",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.deleteArticleNotes(params);
      dispatch(getArticleItem(params.articleId));
      toast.success("Заметка успешно удалена");

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  item: {},
  loading: 0,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticleItem.pending, (state) => {
        state.item = {};
        state.loading += 1;
      })
      .addCase(getArticleItem.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading -= 1;
      })
      .addCase(getArticleItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addArticleItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addArticleItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addArticleItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addNotes.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addNotes.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addNotes.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteNotes.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteNotes.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteNotes.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default articleSlice.reducer;
