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
    <header className="bg-med p-4">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img src={brand} className="mt-3 mr-3" alt="Brand Logo" width="150px;"/>
          {/* <h1 className='6xl'>Dream Notes</h1> */}
        </Link>

        <nav className="text-center mx-auto">
          {Auth.loggedIn() ? (
            <>
              <span className="nav-link">
              <Link to="/profile">Me</Link>
              < br/>
              <a href="/" onClick={logout}>
                Logout
              </a>
              </span>
            </>
          ) : (
            <>
              <span className="nav-link">
              <Link to="/login">Login</Link>
              <br/>
              <Link to="/signup">Signup</Link>
              </span>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
