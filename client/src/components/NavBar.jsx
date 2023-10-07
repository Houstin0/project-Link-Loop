import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar({user , onLogout}) {
  return (
    <nav className="bg-violet dark:bg-violet-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        <a href="https://flowbite.com" className="flex items-center">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 mr-2" alt="Link Loop Logo" />
          <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">Link Loop</span>
        </a>
        <ul className="flex items-center space-x-4 md:space-x-2  text-white ">
        {user ? (
          <>
            <li>
              <NavLink exact to="/home" className="nav-link" activeClassName="active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/messaging" className="nav-link" activeClassName="active">
                Messages
              </NavLink>
            </li>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
          </>
        ) 
        : (
          <li>
            <NavLink to="/signup" className="nav-link" activeClassName="active">
              Sign Up
            </NavLink>
          </li>
          
        )}
        </ul>
      </div>
    </nav>
  );


}

export default NavBar;
