import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { scpService } from "../../service/scpService";
import { router } from "../../router";

export const getScpItem = createAsyncThunk("scpItem/getScpItem", async (scpId, { rejectWithValue }) => {
  try {
    const response = await scpService.getScp(scpId);
    if (response?.length < 1) {
      router.navigate("../not-found");
      throw new Error("Scp не был найден");
    }

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

export const addScpItem = createAsyncThunk("scpItem/addScpItem", async (params, { rejectWithValue }) => {
  try {
    const response = await scpService.addScp(params.newScp);
    toast.success("Объект успешно создан");
    params.cb();

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);

    return rejectWithValue(error.message);
  }
});

export const updateScpItem = createAsyncThunk("scpItem/updateScpItem", async (params, { rejectWithValue }) => {
  try {
    const response = await scpService.updateScp(params.body);
    toast.success("Объект успешно обновлен");
    params.cb();

    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);

    return rejectWithValue(error.message);
  }
});

export const deleteScpItem = createAsyncThunk("scpItem/deleteScpItem", async (scpId, { rejectWithValue }) => {
  try {
    const response = await scpService.deleteScp(scpId);
    toast.success("Объект успешно удалён");
    return response;
  } catch (error) {
    console.error(error);
    toast.error(error.message);
    return rejectWithValue(error.message);
  }
});

const initialState = {
  item: {},
  loading: 0,
};

const ScpSlice = createSlice({
  name: "scp",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder
      .addCase(getScpItem.pending, (state) => {
        state.item = {};
        state.loading += 1;
      })
      .addCase(getScpItem.fulfilled, (state, action) => {
        state.item = action.payload;
        state.loading -= 1;
      })
      .addCase(getScpItem.rejected, (state) => {
        state.loading -= 1;
      });

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
      .addCase(updateScpItem.pending, (state) => {
        state.loading += 1;
      })
      .addCase(updateScpItem.fulfilled, (state) => {
        state.loading -= 1;
      })
      .addCase(updateScpItem.rejected, (state) => {
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
