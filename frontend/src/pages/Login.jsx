import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function submitHandler(e) {
    e.preventDefault();
  }

  function eventHandler(e) {
    setUser((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
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
            value={user.email}
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
            value={user.password}
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
            Not a user?
          </Link>
        </div>
      </form>
    </section>
  );
}
export default Login;
