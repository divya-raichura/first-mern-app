import axios from "axios";

const API_URL = "/api/auth/register";

// Register user
const register = async (userData, thunkAPI) => {
  try {
    const { data } = await axios.post(API_URL, userData);

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
  logout,
};

export default authService;
