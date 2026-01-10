import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { scpService } from "../../service/scpService";

export const getScps = createAsyncThunk("scpList/getScps", async (_, { rejectWithValue }) => {
  try {
    return await scpService.getAllScp();
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  list: [],
  loading: 0,
};

export const scpsSlice = createSlice({
  name: "scps",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScps.pending, (state) => {
        state.list = [];
        state.loading += 1;
      })
      .addCase(getScps.fulfilled, (state, action) => {
        state.list = action.payload;
        state.loading -= 1;
      })
      .addCase(getScps.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default scpsSlice.reducer;
