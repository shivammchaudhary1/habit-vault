import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../utility/config";

// Async thunk to fetch stats for a habit
export const fetchHabitStats = createAsyncThunk(
  "stats/fetchHabitStats",
  async (habitId, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/stats/get/${habitId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch stats");
      }
      return data.stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    stats: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearStatsError: (state) => {
      state.error = null;
    },
    clearStats: (state) => {
      state.stats = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHabitStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabitStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchHabitStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStatsError, clearStats } = statsSlice.actions;
export const selectStats = (state) => state.stats.stats;
export const selectStatsLoading = (state) => state.stats.loading;
export const selectStatsError = (state) => state.stats.error;

export default statsSlice.reducer;
