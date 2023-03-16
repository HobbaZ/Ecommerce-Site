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
      theme === "Light" ? "#ffffff" : "#000000";
    document.body.style.color = theme === "Light" ? "#000000" : "#ffffff";
  }, [theme]);

  //Gets the logged in user's name, displays the first and second letter of the first word
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
            <i className="fas fa-bars"></i>
          </span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ml-auto">
            <form className="form-inline nav-link">
              <input
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search for a product"
              />
              <Button
                className={`btn background ml-2 ${theme} themebutton`}
                type="submit"
              >
                <i className="fas fa-search"></i>
              </Button>
            </form>

            <NavLink className="ml-3 my-2 nav-link navbarlink" to="/stores">
              <div className={`background ${theme}`}>
                Stores <i className="fas fa-store-alt"></i>
              </div>
            </NavLink>

            <NavLink className="ml-3 my-2 nav-link" to="/contactus">
              <div className={`background ${theme}`}>
                Contact Us <i className="fas fa-comment-alt"></i>
              </div>
            </NavLink>

            <Button
              onClick={toggleTheme}
              className={` ml-3 my-3 nav-link btn background ${theme} themebutton`}
            >
              {theme + " theme "}
              {theme === "dark" ? (
                <i className="fas fa-adjust"></i>
              ) : (
                <i className="fas fa-adjust"></i>
              )}
            </Button>

            {/*Only show if user logged in*/}
            {Auth.loggedIn() ? (
              <>
                <NavLink
                  to="/cart"
                  className={`ml-3 my-2 nav-link background ${theme}`}
                >
                  <div className={`background ${theme}`}>
                    Cart <i className="fas fa-shopping-cart"></i>
                  </div>

                  {/*{cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}*/}
                </NavLink>

                <div
                  className={`mr-3 my-2 nav-item dropdown background ${theme}`}
                  tabIndex="0"
                >
                  <Button
                    className={` mx-auto nav-link dropdown-toggle background ${theme}`}
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
                    className={`background ${theme} dropdown-menu p-1 ml-0 border-0`}
                    aria-labelledby="navbarDropdown"
                    style={{ right: "0", left: "auto" }}
                  >
                    <NavLink to="/saved" className={`nav-link`} tabIndex="0">
                      <div className={`background ${theme}`}>
                        Saved Products <i className="fas fa-heart"></i>
                      </div>
                    </NavLink>
                    <NavLink to="/profile" className={`nav-link`} tabIndex="0">
                      <div className={`background ${theme}`}>
                        My Profile <i className="fas fa-user"></i>
                      </div>
                    </NavLink>

                    <NavLink to="/orders" className={`nav-link`} tabIndex="0">
                      <div className={`background ${theme}`}>
                        My Orders <i className="fas fa-file-invoice"></i>
                      </div>
                    </NavLink>

                    {Auth.getProfile().data.isAdmin && (
                      <>
                        <NavLink
                          to="/mystores"
                          className={`nav-link`}
                          tabIndex="0"
                        >
                          <div className={`background ${theme}`}>
                            My Stores <i className="fas fa-store-alt"></i>
                          </div>
                        </NavLink>

                        <NavLink
                          to="/products"
                          className={`nav-link`}
                          tabIndex="0"
                        >
                          <div className={`background ${theme}`}>
                            My Products{" "}
                            <i className="fas fa-boxes" aria-label=""></i>
                          </div>
                        </NavLink>
                      </>
                    )}

                    <div className="mx-auto" tabIndex="0">
                      <Button
                        className={`btn-primary px-4`}
                        onClick={Auth.logout}
                      >
                        Logout <i className="fas fa-sign-out-alt"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/*Show if user not logged in*/}
                <NavLink className="ml-3 my-2 nav-link" to="/login">
                  <div className={`background ${theme}`}>
                    Login <i className="fas fa-sign-in-alt"></i>
                  </div>
                </NavLink>

                <NavLink className="ml-3 my-2 nav-link" to="/signup">
                  <div className={`background ${theme}`}>
                    Signup <i className="fas fa-user"></i>
                  </div>
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
