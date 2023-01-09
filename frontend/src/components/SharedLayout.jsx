import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function SharedLayout() {
  return (
    <div className="px-20">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default SharedLayout;
