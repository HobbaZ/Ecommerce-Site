import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Container, Button, NavbarBrand, Badge } from "react-bootstrap";
import Auth from "../utils/auth";

import { useTheme, ThemeContext } from "../Theme";

const AppNavbar = () => {
  const { toggleTheme } = useTheme();
  const { theme } = useContext(ThemeContext);
  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  const [cartProducts, setCartProducts] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(cartProducts.length);

  /*useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const products = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setCartProducts(products);
        setCartItemCount(products.length);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [cartProducts]);*/

  useEffect(() => {
    document.body.style.backgroundColor =
      theme === "Light" ? "#ffffff" : "rgb(29, 29, 29)";
    document.body.style.color =
      theme === "Light" ? "rgb(29, 29, 29)" : "#ffffff";
  }, [theme]);

  //Gets the logged in user's name, displays the first and second letter of the first word
  function getUserInitial() {
    return Auth.getProfile().data.name[0] + Auth.getProfile().data.name[1];
  }

  return (
    <nav className={`navbar fixed-top navbar-expand-lg background ${theme}`}>
      <div className="container-lg fluid">
        <a
          href="#maincontent"
          role="button"
          className="sr-only sr-only-focusable skip-link position-absolute"
          tabIndex="0"
        >
          Skip to main content
        </a>
        <NavLink className={`ms-3 nav-brand nav-link `} to="/">
          <NavbarBrand className={`background ${theme}`}>
            Ecommerce site
          </NavbarBrand>
        </NavLink>

        <button
          className={`navbar-toggler background ${theme}`}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation menu"
        >
          <span className={`navbarToggler`}>
            <i className="fas fa-bars"></i>
          </span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <nav className="navbar-nav me-auto mb-2 mb-lg-0">
            <a className={`ms-3 nav-link background ${theme}`} href="/stores">
              Stores <i className={`fas fa-store-alt`}></i>
            </a>

            <a
              className={`ms-3 nav-link background ${theme}`}
              href="/contactus"
            >
              Contact Us <i className={`fas fa-comment-alt`}></i>
            </a>

            <button
              onClick={toggleTheme}
              className={` ms-3 nav-link background ${theme} themebutton`}
            >
              {theme + " theme "}
              {theme === "Dark" ? (
                <i className="fas fa-adjust"></i>
              ) : (
                <i className="fas fa-adjust"></i>
              )}
            </button>

            {Auth.loggedIn() && (
              <a className={`ms-3 nav-link background ${theme}`} href="/cart">
                Cart{" "}
                <i className={`fas fa-shopping-cart`}>
                  {cartItemCount > 0 && (
                    <Badge bg="success">{cartItemCount}</Badge>
                  )}
                </i>
              </a>
            )}

            <form className="ms-3 d-flex form-inline">
              <input
                className="form-control me-sm-1"
                type="search"
                placeholder="Search"
                aria-label="Search for a product"
              />
              <button
                className={`btn btn-outline-success my-sm-0 background ${theme}`}
                type="submit"
                aria-label="search button"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>

            {Auth.loggedIn() ? (
              <>
                <div className={`ms-3 nav-item dropdown background ${theme}`}>
                  <button
                    className={` me-5 my-2 nav-link btn dropdown-toggle background ${theme} themebutton`}
                    id="navbarDropdown"
                    tabIndex="0"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className={`btn-primary circle`}>
                      {getUserInitial()}
                    </span>

                    {Auth.getProfile().data.name}
                  </button>
                  <div
                    className={`background ${theme} dropdown-menu`}
                    aria-labelledby="navbarDropdown"
                  >
                    <NavLink
                      className={`dropdown-item nav-link`}
                      to="/savedproducts"
                    >
                      <div className={`background ${theme}`}>
                        Saved Products <i className="fas fa-heart"></i>
                      </div>
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
                          to="/myproducts"
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
                  className={`ms-3 nav-link background ${theme}`}
                >
                  Login <i className="fas fa-sign-in-alt"></i>
                </NavLink>

                <NavLink
                  to="/signup"
                  className={`ms-3 nav-link background ${theme}`}
                >
                  Signup <i className="fas fa-user"></i>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
