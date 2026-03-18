import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "@/store/scpList/slice";
import scpSlice from "@/store/scpItem/slice";
import articlesSlice from "@/store/articleList/slice";
import articleSlice from "@/store/articleItem/slice";
import categoriesSlice from "@/store/categoryList/slice";
import combinedDbSlice from "@/store/combinedDb/slice";

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
