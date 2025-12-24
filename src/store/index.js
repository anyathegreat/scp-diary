import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "./scpList/slice";
import scpSlice from "./scpItem/slice";
import articlesSlice from "./scpArticles/slice";

export const store = configureStore({
  reducer: {
    scpArticles: articlesSlice,
    scpList: scpsSlice,
    scpItem: scpSlice,
  },
});
