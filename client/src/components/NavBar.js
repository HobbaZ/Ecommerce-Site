import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Button, NavDropdown } from "react-bootstrap";
import Auth from "../utils/auth";

import { useTheme, ThemeContext } from "../Theme";

const AppNavbar = (props) => {
  const { currentuser } = props;
  const [userData, setUserData] = useState({});

  const { toggleTheme } = useTheme();
  const { theme } = useContext(ThemeContext);

  const setBodyBackground = () => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#000000";
  };

  setBodyBackground();

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch(`/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        const user = await response.json();
        document.title = `${user.name}'s Profile`;
        setUserData(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  return (
    <Container fluid>
      <nav className={`navbar fixed-top navbar-expand-lg background ${theme}`}>
        <NavLink
          className={`ml-3 nav-brand navLink background ${theme}`}
          to="/"
        >
          <div>Ecommerce site</div>
        </NavLink>

        {/*Navbar collapse and expand */}
        <Button
          className={`navbar-toggler background ${theme}`}
          type="button"
          variant={theme}
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className={`navbarToggler`}>
            <i className={`fas fa-bars`}></i>
          </span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ml-auto mb-2 mb-lg-0">
            <NavLink className={`ml-3 my-2 nav-link`} to="/search">
              <div className={`background ${theme}`}>Search</div>
            </NavLink>

            <Button
              onClick={toggleTheme}
              className={`ml-3 my-2 background ${theme} themebutton`}
            >
              {theme} Theme
            </Button>

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

            {/*Only show if user logged in*/}
            {Auth.loggedIn() ? (
              <>
                <NavDropdown
                  title={
                    <span className={`background ${theme}`}>
                      {`${userData.name}`}
                    </span>
                  }
                  id="basic-nav-dropdown"
                  className={`ml-3 my-2 background ${theme}`}
                >
                  {userData.isAdmin ? (
                    <NavDropdown.Item to="/saved">
                      <div className={`background ${theme}`}>My Store</div>
                    </NavDropdown.Item>
                  ) : null}
                  <NavDropdown.Item to="/saved">
                    <div className={`background ${theme}`}>Saved Products</div>
                  </NavDropdown.Item>
                  <NavDropdown.Item to="/profile">
                    <div className={`background ${theme}`}>My Profile</div>
                  </NavDropdown.Item>
                  <NavDropdown.Item to="/saved">
                    <div className={`background ${theme}`}>Order History</div>
                  </NavDropdown.Item>
                  <div className="text-center">
                    <Button
                      className={`btn form-btn navBtn w-75 background ${theme}`}
                      onClick={Auth.logout}
                    >
                      Logout
                    </Button>
                  </div>
                </NavDropdown>
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
