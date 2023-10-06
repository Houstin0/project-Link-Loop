import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

function NavBar() {
  return (
    <div id="nav-bar">
      <h1>Link Loop</h1>
      <ul>
        <li>
          <NavLink to="/login" className="nav-link" activeClassName="active">
            Log in
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/" className="nav-link" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/messaging" className="nav-link" activeClassName="active">
            Messages
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/logout" className="nav-link" activeClassName="active">
            Log out
          </NavLink>
        </li> */}
      </ul>
    </div>
  );
}

export default NavBar;