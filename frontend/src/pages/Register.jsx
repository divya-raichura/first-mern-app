import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    // does code run after naigate? yes

    dispatch(reset());
  }, [user, isError, isSuccess, message, dispatch, navigate]);

  function eventHandler(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const { name, email, password, password2 } = userData;

    if (!name || !email || !password || !password2) {
      toast.error("Please fill all fields");
    } else if (userData.password.length < 6) {
      toast.error("Password length should be greater than six characters");
    } else if (userData.password != userData.password2) {
      toast.error("Passwords do not match");
    } else {
      // @resource: https://redux.js.org/tutorials/essentials/part-2-app-structure
      // Any time an action has been dispatched and the Redux store has been updated, useSelector will re-run our selector function. If the selector returns a different value than last time, useSelector will make sure our component re-renders with the new value.
      dispatch(register(userData));
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center mt-36 w-3/4 m-auto">
        <PulseLoader color="rgb(2 132 199 " />
      </div>
    );
  }

  return (
    <section>
      <div className="text-center m-6 p-6 font-bold text-slate-900 text-4xl">
        <h1 className="">Register</h1>
      </div>
      <form
        className="bg-white w-3/5 mx-auto shadow-2xl rounded-xl md:w-1/2 px-4 pt-2 pb-4 sm:px-8 sm:pt-6 sm:pb-8"
        onSubmit={submitHandler}
      >
        <div className="mb-10">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="nameId"
          >
            Name
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-sky-200"
            placeholder="Name"
            type="text"
            id="nameId"
            name="name"
            value={userData.name}
            onChange={eventHandler}
          />
        </div>
        <div className="mb-10">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="emailId"
          >
            Email
          </label>
          <input
            type="email"
            id="emailId"
            name="email"
            value={userData.email}
            className="shadow border rounded w-full py-2 px-3 focus:outline-sky-200 text-gray-700 leading-tight  "
            placeholder="Email"
            onChange={eventHandler}
          />
        </div>
        <div className="mb-10">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="passwordId"
          >
            Password
          </label>
          <input
            type="password"
            id="passwordId"
            name="password"
            value={userData.password}
            onChange={eventHandler}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-sky-200"
            placeholder="Password"
          />
        </div>
        <div className="mb-10">
          <label
            className="block text-gray-700 text-sm font-medium mb-2"
            htmlFor="password2Id"
          >
            Confirm Password
          </label>
          <input
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-sky-200"
            placeholder="Confirm Password"
            type="password"
            id="password2Id"
            name="password2"
            value={userData.password2}
            onChange={eventHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ">
            Register
          </button>
          <Link
            className="font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/login"
          >
            Already a user?
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Register;
