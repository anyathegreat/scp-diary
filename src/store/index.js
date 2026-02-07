import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "./scpList/slice";
import scpSlice from "./scpItem/slice";
import articlesSlice from "./articleList/slice";
import articleSlice from "./articleItem/slice";
import categoriesSlice from "./categoryList/slice";
import combinedDbSlice from "./combinedDb/slice";

export const store = configureStore({
  reducer: {
    scpList: scpsSlice,
    scpItem: scpSlice,
    articleItem: articleSlice,
    articleList: articlesSlice,
    categoryList: categoriesSlice,
    combinedDb: combinedDbSlice,
  },
});
