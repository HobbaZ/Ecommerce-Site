import { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Auth from "../utils/auth";

import { useTheme, ThemeContext } from "../Theme";

const AppNavbar = () => {
  const { toggleTheme } = useTheme();
  const { theme } = useContext(ThemeContext);

  return (
    <Container fluid>
      <nav
        className={`navbar fixed-top navbar-expand-lg navbar-light background ${theme}`}
      >
        <NavLink className={`text-white ml-3 nav-brand navLink`} to="/">
          <div className={`background ${theme}`}>Ecommerce site</div>
        </NavLink>

        {/*Navbar collapse and expand */}
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbarToggler">
            <i className={`fas fa-bars background ${theme}`}></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ml-auto mb-2 mb-lg-0">
            <NavLink className="ml-3 my-2 nav-link" to="/search">
              <div className={`background ${theme}`}>Search</div>
            </NavLink>

            <NavLink
              to="/cart"
              className={`ml-3 my-2 nav-link background ${theme}`}
            >
              <div className={`background ${theme}`}>Cart</div>

              {/*{cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}*/}
            </NavLink>

            <Button
              className={`ml-3 background ${theme}`}
              onClick={toggleTheme}
            >
              {theme} Theme
            </Button>

            {/*Only show if user logged in*/}
            {Auth.loggedIn() ? (
              <>
                <NavLink className="ml-3 my-2 nav-link" to="/saved">
                  <div className={`background ${theme}`}>My Collection</div>
                </NavLink>

                <NavLink className="ml-3 my-2 nav-link" to="/profile">
                  <div className={`background ${theme}`}>My Profile</div>
                </NavLink>

                <Button
                  className={`btn form-btn navBtn ml-3 col-3 col-sm-2 col-lg-auto background ${theme}`}
                  onClick={Auth.logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {/*Show if user not logged in*/}
                <NavLink className="ml-3 my-2 nav-link" to="/login">
                  <div className={`background ${theme}`}>Login</div>
                </NavLink>

                <NavLink className="ml-3 my-2 nav-link" to="/signup">
                  <div className={`background ${theme}`}>Signup</div>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </nav>
    </Container>
  );
};

export default AppNavbar;
