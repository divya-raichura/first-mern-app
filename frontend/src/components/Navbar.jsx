import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="pt-8 text-sm flex items-center justify-between font-semibold text-slate-200 leading-6">
      <div className="text-slate-900 text-3xl">
        <Link to="/">App</Link>
      </div>
      <nav className="flex items-center text-slate-700">
        <ul className="flex items-center space-x-12">
          <li>
            <Link className="hover:text-sky-400" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="hover:text-sky-400" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="hover:text-sky-400" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
export default Navbar;
