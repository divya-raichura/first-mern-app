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
    return await goalService.createGoal(data, token, thunkAPI);
  }
);

// read
export const readGoals = createAsyncThunk(
  "goals/readGoals",
  async (_, thunkAPI) => {
    const {
      auth: {
        user: { token },
      },
    } = thunkAPI.getState();
    return await goalService.readGoals(token, thunkAPI);
  }
);

// update
export const updateGoal = createAsyncThunk(
  "goals/updateGoal",
  async (data, thunkAPI) => {
    const {
      auth: {
        user: { token },
      },
    } = thunkAPI.getState();
    return await goalService.updateGoal(data, token, thunkAPI);
  }
);

// delete
export const deleteGoal = createAsyncThunk(
  "goals/deleteGoal",
  async (goalId, thunkAPI) => {
    const {
      auth: {
        user: { token },
      },
    } = thunkAPI.getState();
    return await goalService.deleteGoal(goalId, token, thunkAPI);
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
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // read
      .addCase(readGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readGoals.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.goals = action.payload;
      })
      .addCase(readGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("action", action, action.payload);
        state.message = action.payload;
      })
      // update
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // find goal to update
        const updatedGoals = state.goals.map((item) => {
          if (item._id !== action.payload._id) {
            // isn't the item we care about
            return item;
          }
          return action.payload;
        });
        state.goals = updatedGoals;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // delete
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        // find goal and delete it
        state.goals = state.goals.filter(
          (item) => item._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
