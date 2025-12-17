import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { scpService } from "../../service/scpService";
import { toast } from "react-toastify";

export const addScpItem = createAsyncThunk("scpItem/addScpItem", async (body, { rejectWithValue }) => {
  try {
    return await scpService.addScp(body);
  } catch (error) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const deleteScpItem = createAsyncThunk("scpItem/deleteScpItem", async (id, { rejectWithValue }) => {
  try {
    const response = await scpService.deleteScp(id);
    return response;
  } catch (error) {
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  loading: 0,
};

const ScpSlice = createSlice({
  name: "scp",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(addScpItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(addScpItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(addScpItem.rejected, (state) => {
        state.loading -= 1;
      });

    builder
      .addCase(deleteScpItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(deleteScpItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(deleteScpItem.rejected, (state) => {
        state.loading -= 1;
      });
  },
});

export default ScpSlice.reducer;
