import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar({user , onLogout}) {
  return (
    <nav className="bg-violet dark:bg-violet-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-2">
        <a href="/home" className="flex items-center">
          <span className="self-center text-xl font-bold whitespace-nowrap dark:text-black">Link Loop</span>
        </a>
        <ul className="flex items-center space-x-4 md:space-x-2  text-black ">
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
              <NavLink to="/about" className="nav-link" activeClassName="active">
                About
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="nav-link" activeClassName="active">
                Contact
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
