import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../utility/config";

export const toggleHabitLog = createAsyncThunk(
  "habitLogs/toggle",
  async (habitId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/habitLog/toggle`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify({ habitId }),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.error || "Failed to toggle habit log");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const habitLogSlice = createSlice({
  name: "habitLogs",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    clearHabitLogError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(toggleHabitLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleHabitLog.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(toggleHabitLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearHabitLogError } = habitLogSlice.actions;
export default habitLogSlice.reducer;
