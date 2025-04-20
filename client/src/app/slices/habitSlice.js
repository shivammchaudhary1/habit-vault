import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import config from "../../utility/config";

// Async Thunks
export const createHabit = createAsyncThunk(
  "habits/create",
  async (habitData, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/habit/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(habitData),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to create habit");
      }
      return data.habit;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchHabits = createAsyncThunk(
  "habits/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/habit/get`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch habits");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHabit = createAsyncThunk(
  "habits/update",
  async ({ id, updateData }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/habit/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update habit");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteHabit = createAsyncThunk(
  "habits/delete",
  async (id, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(`${config.api}/api/habit/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to delete habit");
      }
      return id; // Return the deleted habit ID
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateHabitStatus = createAsyncThunk(
  "habits/updateStatus",
  async ({ id, isActive }, { rejectWithValue, getState }) => {
    try {
      const { auth } = getState();
      const response = await fetch(
        `${config.api}/api/habit/update-status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
          body: JSON.stringify({ isActive }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to update habit status");
      }
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const habitSlice = createSlice({
  name: "habits",
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentHabit: null,
  },
  reducers: {
    setCurrentHabit: (state, action) => {
      state.currentHabit = action.payload;
    },
    clearHabitError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Habit
      .addCase(createHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.items.unshift(action.payload);
      })
      .addCase(createHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Habits
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Habit
      .addCase(updateHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHabit.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Habit Status
      .addCase(updateHabitStatus.pending, (state) => {
        state.statusUpdating = true;
        state.statusError = null;
      })
      .addCase(updateHabitStatus.fulfilled, (state, action) => {
        state.statusUpdating = false;
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.items[index] = {
            ...state.items[index],
            isActive: action.payload.isActive,
            streak: action.payload.isActive ? state.items[index].streak : 0,
            lastCheckIn: action.payload.isActive
              ? state.items[index].lastCheckIn
              : null,
          };
        }
      })
      .addCase(updateHabitStatus.rejected, (state, action) => {
        state.statusUpdating = false;
        state.statusError = action.payload;
      })

      // Delete Habit
      .addCase(deleteHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(deleteHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentHabit, clearHabitError } = habitSlice.actions;

// Selectors
export const selectAllHabits = (state) => state.habits.items;
export const selectHabitLoading = (state) => state.habits.loading;
export const selectHabitError = (state) => state.habits.error;
export const selectCurrentHabit = (state) => state.habits.currentHabit;

export default habitSlice.reducer;
