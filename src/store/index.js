import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "./scpList/slice";
import scpSlice from "./scpItem/slice";
import articlesSlice from "./articleList/slice";
import articleSlice from "./articleItem/slice";
import CategoryAllSlice from "./categoryList/slice";

export const store = configureStore({
  reducer: {
    scpList: scpsSlice,
    scpItem: scpSlice,
    articleItem: articleSlice,
    articleList: articlesSlice,
    categoryList: CategoryAllSlice,
  },
});
