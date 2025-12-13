import { configureStore } from "@reduxjs/toolkit";
import scpsSlice from "./scplist/slice";

export const store = configureStore({
  reducer: {
    scpList: scpsSlice,
  },
});
