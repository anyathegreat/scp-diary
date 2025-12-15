import { configureStore } from "@reduxjs/toolkit";

import scpsSlice from "./scpList/slice";
import scpSlice from "./scpItem/slice";

export const store = configureStore({
  reducer: {
    scpList: scpsSlice,
    scpItem: scpSlice,
  },
});
