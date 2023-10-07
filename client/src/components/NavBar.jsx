import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar({user , onLogout}) {
  return (
    <div id="nav-bar">
      <h1>Link Loop</h1>
      <ul>
        {user ? (
          <>
            <li>
              <button onClick={onLogout}>Logout</button>
            </li>
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
          </>
        ) : (
          <li>
            <NavLink to="/" className="nav-link" activeClassName="active">
              Log in
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavBar;