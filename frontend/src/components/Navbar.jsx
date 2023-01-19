import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function submitLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <header className="pt-6 text-sm flex items-center justify-between font-semibold text-slate-200 leading-6">
      <div className="text-slate-900 text-xl sm:text-2xl md:text-3xl">
        <Link to="/">KaamKaro</Link>
      </div>
      <nav className="flex text-lg text-slate-700">
        <ul className="flex items-center space-x-8">
          {user ? (
            <>
              <li>
                <Link
                  className="hover:text-sky-400 sm:flex gap-x-2 active:text-sky-400 hidden"
                  to="/dashboard"
                >
                  <HomeIcon />
                  Dashboard
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  className="hover:text-sky-400 active:text-sky-400"
                  to="/login"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-sky-400 active:text-sky-400"
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      {user && (
        <div>
          <button
            onClick={submitLogout}
            className="bg-slate-700 hover:bg-slate-600 focus:outline-none text-white font-semibold h-8 px-1 sm:h-10 sm:px-2 rounded-lg w-full flex items-center justify-center sm:w-auto dark:highlight-white/20"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export const HomeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  );
};

export const LogoutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-1"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
      />
    </svg>
  );
};

export default Navbar;
