import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <div className="w-5/6 m-auto h-full">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default SharedLayout;
