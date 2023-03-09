import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Container, Button, NavbarBrand } from "react-bootstrap";
import Auth from "../utils/auth";

import { useTheme, ThemeContext } from "../Theme";

const AppNavbar = () => {
  const { toggleTheme } = useTheme();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "light" ? "#ffffff" : "#000000";
    document.body.style.color = theme === "light" ? "#000000" : "#ffffff";
  }, [theme]);

  //Gets the logged in user's name, if it has a space it will display the first letters of the first and second word, if it doesn't it will display the first and second letter of the first word
  function getUserInitial() {
    return Auth.getProfile().data.name[0] + Auth.getProfile().data.name[1];
  }

  return (
    <Container fluid>
      <nav className={`navbar fixed-top navbar-expand-lg background ${theme}`}>
        <NavLink className={`ml-3 nav-brand nav-link `} to="/">
          <NavbarBrand className={`background ${theme}`}>
            Ecommerce site
          </NavbarBrand>
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
            <form className="form-inline nav-link">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <Button
                className={`btn background ${theme} themebutton`}
                type="submit"
              >
                Search
              </Button>
            </form>

            <NavLink className="ml-3 my-2 nav-link" to="/contactus">
              <div className={`background ${theme}`}>Contact Us</div>
            </NavLink>

            <Button
              onClick={toggleTheme}
              className={` ml-3 my-3 nav-link btn background ${theme} themebutton`}
            >
              {theme} Theme
            </Button>

            {/*Only show if user logged in*/}
            {Auth.loggedIn() ? (
              <>
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

                <div
                  className={`mx-3 my-2 nav-item dropdown background ${theme}`}
                >
                  <Button
                    className={`nav-link dropdown-toggle background ${theme}`}
                    id="navbarDropdown"
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className={`background ${theme}`}>
                      <span className={`btn-primary circle`}>
                        {getUserInitial()}
                      </span>

                      {Auth.getProfile().data.name}
                    </div>
                  </Button>
                  <div
                    className={`background ${theme} dropdown-menu p-1 mx-3 border-0`}
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink to="/saved" className={`nav-link`}>
                      <div className={`background ${theme}`}>
                        Saved Products
                      </div>
                    </NavLink>
                    <NavLink to="/profile" className={`nav-link`}>
                      <div className={`background ${theme}`}>My Profile</div>
                    </NavLink>

                    <NavLink to="/orders" className={`nav-link`}>
                      <div className={`background ${theme}`}>Orders</div>
                    </NavLink>

                    {Auth.getProfile().data.isAdmin && (
                      <>
                        <NavLink to="/stores" className={`nav-link`}>
                          <div className={`background ${theme}`}>Stores</div>
                        </NavLink>

                        <NavLink to="/products" className={`nav-link`}>
                          <div className={`background ${theme}`}>Products</div>
                        </NavLink>
                      </>
                    )}

                    <div className="mx-auto">
                      <Button
                        className={`btn-primary px-4`}
                        onClick={Auth.logout}
                      >
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
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
