import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { articleService } from "../../service/articleService";
import { getArticles } from "../articleList/slice";
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

export const addArticleItem = createAsyncThunk(
  "articleItem/addArticleItem",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.addArticle(params.newArticle);
      dispatch(getArticles());
      params.cb();
      toast.success("Статья успешно созданна");
      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteArticleItem = createAsyncThunk(
  "articleItem/deleteArticleItem",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.deleteArticle(params);
      dispatch(getArticles());
      toast.success("Статья успешно удалена");
      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const addNote = createAsyncThunk("articleItem/addNote", async (params, { dispatch, rejectWithValue }) => {
  try {
    const response = await articleService.addArticleNote(params);
    dispatch(getArticleItem(params.articleId));
    toast.success("Заметка успешно создана");

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const updateNote = createAsyncThunk("articleItem/updateNote", async (params, { dispatch, rejectWithValue }) => {
  try {
    const response = await articleService.updateArticleNote(params);
    dispatch(getArticleItem(params.articleId));
    toast.success("Заметка успешно обновленна");

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteNote = createAsyncThunk("articleItem/deleteNote", async (params, { dispatch, rejectWithValue }) => {
  try {
    const response = await articleService.deleteArticleNote(params);
    dispatch(getArticleItem(params.articleId));
    toast.success("Заметка успешно удалена");

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addArticleScp = createAsyncThunk(
  "articleItem/addArticleScp",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.addArticleScpObject(params.body);
      dispatch(getArticleItem(params.body.article_id));
      params.cb();
      toast.success("Scp успешно привязан");

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteArticleScp = createAsyncThunk(
  "articleItem/deleteArticleScp",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.deleteArticleScpObject(params.body);
      dispatch(getArticleItem(params.body.article_id));
      params.cb();
      toast.success("Scp успешно откреплён");

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const addArticleCategory = createAsyncThunk(
  "articleItem/addArticleCategory",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.addArticleCategoryObject(params.body);
      dispatch(getArticleItem(params.body.article_id));
      params.cb();
      toast.success("Категория успешно привязана");

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteArticleCategory = createAsyncThunk(
  "articleItem/deleteArticleCategory",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await articleService.deleteArticleCategoryObject(params.body);
      dispatch(getArticleItem(params.body.article_id));
      params.cb();
      toast.success("Категория успешно отвязанна");

      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const initialState = {
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
      .addCase(deleteArticleItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteArticleItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteArticleItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addNote.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addNote.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addNote.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(updateNote.pending, (state) => {
        state.loading += 1;
      })
      .addCase(updateNote.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(updateNote.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteNote.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteNote.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteNote.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addArticleScp.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addArticleScp.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addArticleScp.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteArticleScp.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteArticleScp.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteArticleScp.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addArticleCategory.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addArticleCategory.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addArticleCategory.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteArticleCategory.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteArticleCategory.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteArticleCategory.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default articleSlice.reducer;
