import React from 'react';
import { Link } from 'react-router-dom';
// import logo
import brand from '../../assets/img/brand.png'

import Auth from '../../utils/auth';
// TODO style and add logo and links
const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header class="header bg-black">
    <nav class="navbar">
        <Link to="/">
<img src={brand} className="mt-3 mr-3" alt="Brand Logo" height="75px;"/>
</Link>
        <ul class="nav-menu mr-5">
      {Auth.loggedIn() ? (
        <>
            <li class="nav-item">
                <Link to="/profile">Me</Link>
            </li>
            <li class="nav-item">
              <a href="/" onClick={logout}>
            Logout
          </a>
            </li>
        </>
      ) : (
        <>
            <li class="nav-item">
                <Link to="/login">Login</Link>
            </li>
            <li class="nav-item">
                <Link to="/signup">Sign Up</Link>
            </li>
        </>
      )}
        </ul>
        <div class="hamburger">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </div>
    </nav>
</header>

  );
};

export default Header;
