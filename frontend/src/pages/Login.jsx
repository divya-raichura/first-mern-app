import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";
import { reset } from "../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isError, isLoading, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  // ?????????????? why not use if statement like isLoading
  // because everytime the component is rendered, we want to check
  // if user is logged in? if yes we want to redirect
  // yes its true that useSelector also rerenders but, only when
  // the data recieved from selector changes
  // so whenever someone visits page after logging, data is not changed
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      // why 2 tinmes ?????????????????? : toast.info('')
      toast.info("You are logged in", {
        toastId: "success1",
      });
      navigate("/dashboard");
    }

    // why 2 times ??????????????????
    dispatch(reset());
  }, [user, isError, isSuccess, message]);

  function eventHandler(e) {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    const { email, password } = userData;

    if (!email || !password) {
      toast.error("Please fill all fields");
    } else {
      dispatch(login(userData));
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
        <h1 className="">Login</h1>
      </div>
      <form
        className="bg-white w-3/5 mx-auto shadow-2xl rounded-xl md:w-1/2 px-4 pt-2 pb-4 sm:px-8 sm:pt-6 sm:pb-8"
        onSubmit={submitHandler}
      >
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
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded ">
            Login
          </button>
          <Link
            className="font-bold text-sm text-blue-500 hover:text-blue-800"
            to="/register"
          >
            New user?
          </Link>
        </div>
      </form>
    </section>
  );
}

export default Login;
