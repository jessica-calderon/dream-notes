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
    <header className="bg-secondary p-4">
      <div className="container flex-row justify-space-between-lg justify-center align-center">
        <Link to="/">
          <img src={brand} className="mt-3 mr-3" alt="Brand Logo" width="150px;"/>
          {/* <h1 className='6xl'>Dream Notes</h1> */}
        </Link>

        <nav className="text-center">
          {Auth.loggedIn() ? (
            <>
              <Link to="/profile">Me</Link>
              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <br/>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
