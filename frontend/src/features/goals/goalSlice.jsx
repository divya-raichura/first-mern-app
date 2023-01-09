import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { goalService } from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// create
export const createGoal = createAsyncThunk(
  "goals/createGoal",
  async (data, thunkAPI) => {
    const {
      auth: {
        user: { token },
      },
    } = thunkAPI.getState();
    return await goalService.createGoal(data, token);
  }
);

// read
export const readGoals = createAsyncThunk(
  "goals/readGoals",
  async (data, thunkAPI) => {
    const {
      auth: {
        user: { token },
      },
    } = thunkAPI.getState();
    return await goalService.readGoals(data, token);
  }
);

// update
export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (data, thunkAPI) => {
    const {
      auth: {
        user: { token },
        user: {
          user: { userId },
        },
      },
    } = thunkAPI.getState();
    return await goalService.updateGoal(userId, data, token);
  }
);

// delete
export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (data, thunkAPI) => {
    const {
      auth: {
        user: { token },
        user: {
          user: { userId },
        },
      },
    } = thunkAPI.getState();
    return await goalService.deleteGoal(userId, token);
  }
);

// slice
const goalSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // create
      .addCase(createGoal.pending, (state) => {})
      .addCase(createGoal.fulfilled, (state) => {})
      .addCase(createGoal.rejected, (state) => {})
      // read
      .addCase(readGoals.pending, (state) => {})
      .addCase(readGoals.fulfilled, (state) => {})
      .addCase(readGoals.rejected, (state) => {})
      // update
      .addCase(updateGoal.pending, (state) => {})
      .addCase(updateGoal.fulfilled, (state) => {})
      .addCase(updateGoal.rejected, (state) => {})
      // delete
      .addCase(deleteGoal.pending, (state) => {})
      .addCase(deleteGoal.fulfilled, (state) => {})
      .addCase(deleteGoal.rejected, (state) => {});
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
