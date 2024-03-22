import React from "react";
import { NavLink } from "react-router-dom";
import "../App.css";
import DarkModeSwitcher from "./DarkModeSwitcher";

function NavBar({ user, onLogout }) {
  function handleLogout() {
    fetch("https://link-db.onrender.com/logout", {
      method: "DELETE",
    }).then(() => onLogout());
  }

  return (
    <nav className="fixed top-0 z-50 w-full bg-purple-700  dark:bg-purple-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <NavLink to="/home" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-100 dark:text-gray-900">
            Link Loop
          </span>
        </NavLink>

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 pt-0"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-1 md:p-0   bg-purple-700 md:flex-row md:space-x-2 md:mt-0 md:bg-purple-700 dark:bg-purple-700 md:dark:bg-purple-700 ">
            {user ? (
              <>
                <li>
                  <NavLink to="/home"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inbox"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Inbox
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </NavLink>
                </li>
                <li onClick={handleLogout}>
                  <NavLink to=""
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Log Out
                  </NavLink>
                </li>

                <button
                  type="button"
                  className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                  data-dropdown-toggle="dropdown-user"
                >
                  <span className="sr-only">Open user menu</span>
                  {user && user.profile_picture ? (
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user.profile_picture}
                      alt="user photo"
                    />
                  ) : (
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://i.pinimg.com/236x/1e/d3/d3/1ed3d3ede778506de6edade417cce3e0.jpg"
                      alt="user photo"
                    />
                  )}
                </button>
              </>
            ) : (
              <>
               <li>
               <DarkModeSwitcher />
               </li>
                <li>
                  <NavLink to="/signup"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Sign Up
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Log In
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/home"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/inbox"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Inbox
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact"
                    className="block py-2 pl-3 pr-4 text-gray-100 rounded hover:bg-gray-900 md:hover:bg-transparent md:hover:text-gray-900 md:p-0 dark:text-gray-900 md:dark:hover:text-gray-100 dark:hover:bg-gray-100 dark:hover:text-hover:bg-gray-100 md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact Us
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
