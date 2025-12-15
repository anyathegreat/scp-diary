import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "./scpPosts/slice";
import scpSlice from "./scpItem/slice";

export const store = configureStore({
  reducer: {
    scpList: scpsSlice,
    scpItem: scpSlice,
  },
});
