import axios from "axios";

const API_GOALS_URL = "/api/goals";

// create
const createGoal = async (goalData, token, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(API_GOALS_URL, goalData, config);

    return data.goal;
  } catch (error) {
    console.log("error", error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.log("message", message);

    return thunkAPI.rejectWithValue(message);
  }
};

// read goals
const readGoals = async (token, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(API_GOALS_URL, config);

    return data.goals;
  } catch (error) {
    console.log("error", error);
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    console.log("message", message);
    return thunkAPI.rejectWithValue(message);
  }
};

// update goals
const updateGoal = async ({ id, goalData }, token, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(
      API_GOALS_URL + `/${id}`,
      goalData,
      config
    );

    return data.goal;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
};

// delete goal
const deleteGoal = async (id, token, thunkAPI) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(API_GOALS_URL + `/${id}`, config);

    return data.id;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();

    return thunkAPI.rejectWithValue(message);
  }
};

export const goalService = {
  createGoal,
  readGoals,
  updateGoal,
  deleteGoal,
};
