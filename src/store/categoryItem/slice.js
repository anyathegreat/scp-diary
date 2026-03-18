import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { router } from "@/router";
import { getCategories } from "@/store/categoryList/slice";
import { categoryService } from "@/service/categoryService";

export const getCategoryItem = createAsyncThunk("categoryList/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await categoryService.getCategory();

    if (response?.length < 1) {
      router.navigate("../not-found");
      throw new Error("Категория не была найдена");
    }

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addCategoryItem = createAsyncThunk(
  "categoryList/addCategoryItem",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryService.addCategory(params.body);
      dispatch(getCategories());
      params.cb();

      toast.success("Категория успешно добавленна");
      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const updateCategoryItem = createAsyncThunk(
  "categoryList/updateCategoryItem",
  async (params, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryService.addCategory(params.body);
      dispatch(getCategories());
      params.cb();

      toast.success("Категория успешно обновленна");
      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const deleteCategoryItem = createAsyncThunk(
  "categoryList/deleteCategoryItem",
  async (categoryId, { dispatch, rejectWithValue }) => {
    try {
      const response = await categoryService.deleteCategory(categoryId);
      dispatch(getCategories());

      toast.success("Категория успешно удалена");
      return response;
    } catch (error) {
      console.error(error);
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  },
);

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
      .addCase(getCategoryItem.pending, (state) => {
        state.list = [];
        state.loading += 1;
      })
      .addCase(getCategoryItem.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading -= 1;
      })
      .addCase(getCategoryItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(addCategoryItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addCategoryItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addCategoryItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(updateCategoryItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(updateCategoryItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(updateCategoryItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteCategoryItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteCategoryItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteCategoryItem.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default categoriesSlice.reducer;
