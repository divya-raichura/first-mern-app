import { useState } from "react";
import { useEffect } from "react";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="flex flex-col items-center justify-start mt-32 h-1/2">
      <div>
        <h1 className="text-4xl text-center">Hello! Welcome to the app 👋</h1>
        <p className="text-md text-center my-4">
          <span>
            <Link
              className="font-bold text-base text-blue-400 hover:text-blue-500"
              to="/login"
            >
              Login
            </Link>
          </span>
          <span className="mx-2">or</span>
          <span>
            <Link
              className="font-bold text-base text-blue-400 hover:text-blue-500"
              to="/register"
            >
              Register
            </Link>
          </span>
          <span className="ml-1"> to continue</span>
        </p>
      </div>
      <div className="mt-14 w-1/2 text-center">
        <h1 className="text-2xl font-semibold">Tech Stack used</h1>
        <ul className="mt-14 text-md tracking-wide">
          <li className="mb-1">
            React and Redux toolkit for{" "}
            <span className="underline">frontend</span>
          </li>
          <li className="mb-1">
            NodeJs/ExpressJs in <span className="underline">backend</span>
          </li>
          <li className="mb-1">
            TailwindCSS for <span className="underline">styling</span>
          </li>
          <li className="mb-1">
            <span className="underline">Database</span> - Mongodb
          </li>
        </ul>
      </div>

      {/* <div className="mt-10 w-1/2 text-center  absolute bottom-20">
        Talk is cheap, show me the code:
        <a
          className="text-blue-500 hover:text-blue-400 ml-2"
          href="https://github.com/divya-raichura/first-mern-app"
        >
          repo
        </a>
      </div> */}
    </section>
  );
}
export default Home;
