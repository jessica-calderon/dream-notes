import React from 'react';
import { Link } from 'react-router-dom';
// import logo
import brand from '../../assets/img/brand.png'

import Auth from '../../utils/auth';
const Header = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header bg-dark">
    <nav className="navbar">
        <Link to="/">
<img src={brand} className="mt-3 mr-3" alt="Brand Logo" height="50px;"/>
</Link>
        <ul className="nav-menu mr-5">
      {Auth.loggedIn() ? (
        <>
            <li className="nav-item">
                <h2><Link to="/profile">Me</Link></h2>
            </li>
            <li className="nav-item">
              <h2><a href="/" onClick={logout}>
            Logout
          </a></h2>
            </li>
        </>
      ) : (
        <>
            <li className="nav-item">
                <h2><Link to="/login">Login</Link></h2>
            </li>
            <li className="nav-item">
                <h2><Link to="/signup">Sign Up</Link></h2>
            </li>
        </>
      )}
        </ul>
        <div className="hamburger">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
    </nav>
</header>

  );
};

export default Header;
