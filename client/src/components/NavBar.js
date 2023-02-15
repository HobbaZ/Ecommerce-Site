import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Auth from "../utils/auth";

import { useTheme, ThemeContext } from "../Theme";

const AppNavbar = () => {
  const { toggleTheme } = useTheme();
  const { theme } = useContext(ThemeContext);

  const setBodyBackground = () => {
    document.body.style.backgroundColor =
      theme === "light" ? "#F8f9fa" : "#000000";
  };

  setBodyBackground();

  return (
    <Container fluid>
      <nav className={`navbar fixed-top navbar-expand-lg bg-${theme}`}>
        <NavLink
          className={`ml-3 nav-brand navLink background ${theme}`}
          to="/"
        >
          <div>Ecommerce site</div>
        </NavLink>

        {/*Navbar collapse and expand */}
        <Button
          className="navbar-toggler"
          type="button"
          variant={theme}
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbarToggler">
            <i className={`fas fa-bars background ${theme}`}></i>
          </span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ml-auto mb-2 mb-lg-0">
            <NavLink className={`ml-3 my-2 nav-link`} to="/search">
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
              onClick={toggleTheme}
              className={`ml-3 my-2 background ${theme} bg-${theme} themebutton`}
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
