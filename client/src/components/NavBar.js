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
        <a
          href="#maincontent"
          role="button"
          className="sr-only sr-only-focusable skip-link position-absolute"
          tabIndex="0"
        >
          Skip to main content
        </a>
        <NavLink className={`ml-3 nav-brand nav-link `} to="/">
          <NavbarBrand className={`background ${theme}`}>
            Ecommerce site
          </NavbarBrand>
        </NavLink>

        <Button
          className={`navbar-toggler background ${theme}`}
          variant={theme}
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <span className={`navbarToggler`}>
            <i className="fas fa-bars"></i>
          </span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav ml-auto">
            <form className="form-inline">
              <input
                className="ml-3 form-control search"
                type="search"
                placeholder="Search"
                aria-label="Search for a product"
              />
              <Button
                variant={theme}
                className={`btn-primary searchButton`}
                type="submit"
                aria-label="search"
              >
                <i className="fas fa-search"></i>
              </Button>
            </form>

            <a
              className={`ml-3 nav-link background ${
                theme === "Dark" ? "text-white" : ""
              }`}
              href="/stores"
            >
              Stores <i className={`fas fa-store-alt`}></i>
            </a>

            <a
              className={`ml-3 nav-link background ${
                theme === "Dark" ? "text-white" : ""
              }`}
              href="/contactus"
            >
              Contact Us <i className={`fas fa-comment-alt`}></i>
            </a>

            <Button
              onClick={toggleTheme}
              className={` ml-3 nav-link background ${theme} themebutton`}
            >
              {theme + " theme "}
              {theme === "Dark" ? (
                <i className="fas fa-adjust"></i>
              ) : (
                <i className="fas fa-adjust"></i>
              )}
            </Button>

            {Auth.loggedIn() ? (
              <>
                <a
                  className={`ml-3 nav-link background ${
                    theme === "Dark" ? "text-white" : ""
                  }`}
                  href="/cart"
                >
                  Cart <i className={`fas fa-shopping-cart`}></i>
                </a>

                <div
                  className={`ml-3 mr-5 nav-item dropdown background ${
                    theme === "Dark" ? "text-white" : ""
                  }`}
                >
                  <Button
                    className={` mr-5 nav-link btn dropdown-toggle background ${theme} themebutton`}
                    id="navbarDropdown"
                    tabIndex="0"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className={`btn-primary circle`}>
                      {getUserInitial()}
                    </span>

                    {Auth.getProfile().data.name}
                  </Button>
                  <div
                    className={`background ${theme} dropdown-menu`}
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink
                      className={`dropdown-item nav-link background ${
                        theme === "Dark" ? "text-white" : ""
                      }`}
                      to="/saved"
                    >
                      Saved Products <i className="fas fa-heart"></i>
                    </NavLink>
                    <NavLink to="/profile" className={`dropdown-item nav-link`}>
                      <div className={`background ${theme}`}>
                        My Profile <i className="fas fa-user"></i>
                      </div>
                    </NavLink>

                    <NavLink
                      to="/myorders"
                      className={`dropdown-item nav-link`}
                    >
                      <div className={`background ${theme}`}>
                        My Orders <i className="fas fa-file-invoice"></i>
                      </div>
                    </NavLink>

                    {Auth.getProfile().data.isAdmin && (
                      <>
                        <NavLink
                          to="/mystores"
                          className={`dropdown-item nav-link`}
                        >
                          <div className={`background ${theme}`}>
                            My Stores <i className="fas fa-store-alt"></i>
                          </div>
                        </NavLink>

                        <NavLink
                          to="/products"
                          className={`dropdown-item nav-link`}
                        >
                          <div className={`background ${theme}`}>
                            My Products{" "}
                            <i className="fas fa-boxes" aria-label=""></i>
                          </div>
                        </NavLink>
                      </>
                    )}

                    <Button
                      className={`dropdown-item nav-link btn-primary px-4 text-white w-75 mx-auto`}
                      onClick={Auth.logout}
                    >
                      Logout <i className="fas fa-sign-out-alt"></i>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={`ml-3 nav-link background ${
                    theme === "Dark" ? "text-white" : ""
                  }`}
                >
                  Login <i className="fas fa-sign-in-alt"></i>
                </NavLink>

                <NavLink
                  to="/signup"
                  className={`ml-3 nav-link background ${
                    theme === "Dark" ? "text-white" : ""
                  }`}
                >
                  Signup <i className="fas fa-user"></i>
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
