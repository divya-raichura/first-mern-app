import axios from "axios";

const API_REGISTER_URL = "/api/auth/register";
const API_LOGIN_URL = "/api/auth/login";

// Register user
const register = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(API_REGISTER_URL, userData);

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};

// Login user
const login = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(API_LOGIN_URL, userData);

    localStorage.setItem("user", JSON.stringify(data));

    return data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
