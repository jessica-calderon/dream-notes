import React from "react";
import { Link } from "react-router-dom";
// import logo
import brand from "../../assets/img/brand.png";
import loginIcon from "../../assets/img/login.png";
import logoutIcon from "../../assets/img/logout.png";
import user from "../../assets/img/account.png";
import signupIcon from "../../assets/img/signup.png";

import Auth from "../../utils/auth";
const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <header className="header bg-dark">
      <nav className="navbar">
        <Link to="/">
          <img
            src={brand}
            className="mt-3 mr-3"
            alt="Brand Logo"
            height="50px;"
          />
        </Link>
        <ul className="nav-menu mr-4">
          {Auth.loggedIn() ? (
            <>
              <li className="nav-item">
                <h2 className="display-inline-block">
                  <Link to="/profile">
                    <img
                      src={user}
                      alt="User icon"
                      width="25px;"
                      className="mr-1 display-inline-block"
                    />{" "}
                    Profile
                  </Link>
                </h2>
              </li>
              <li className="nav-item">
                <h2 className="display-inline-block">
                  <a href="/" onClick={logout}>
                    <img
                      src={logoutIcon}
                      alt="Logout icon"
                      width="25px;"
                      className="mr-2 display-inline-block"
                    />
                    Logout
                  </a>
                </h2>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <h2>
                  <Link to="/login">
                    <img
                      src={loginIcon}
                      alt="Login icon"
                      width="25px;"
                      className="mr-2 display-inline-block"
                    />
                    Login
                  </Link>
                </h2>
              </li>
              <li className="nav-item">
                <h2>
                  <img
                    src={signupIcon}
                    alt="Login icon"
                    width="25px;"
                    className="mr-2 display-inline-block"
                  />
                  <Link to="/signup">Sign Up</Link>
                </h2>
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
