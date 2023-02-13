import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/ProductPage";
import Footer from "./components/Footer";

import "./App.css";
import { Badge, Button, Container, Nav, Navbar } from "react-bootstrap";
import { createContext, useContext, useState } from "react";
import Cart from "./pages/Cart";

const ThemeContext = createContext(null);

function App() {
  const [theme1, setTheme1] = useState("light");
  const [theme2, setTheme2] = useState("dark");

  return (
    <ThemeContext.Provider value={theme1}>
      <Router>
        <div
          className={`d-flex flex-column site-container bg-${theme1} text-${theme2}`}
        >
          <header className={`bg-${theme1} text-${theme2}`}>
            <Navbar>
              <Container>
                <Navbar.Brand>
                  <Link className={`bg-${theme1} text-${theme2}`} to="/">
                    E Commerce Site
                  </Link>
                </Navbar.Brand>

                <Nav className="me-auto">
                  <Link to="/cart" className="nav-link">
                    Cart
                    {/*{cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}*/}
                  </Link>
                </Nav>

                <Button
                  className={`bg-${theme1} text-${theme2} border border-${theme2}`}
                  onClick={() => {
                    setTheme1(theme1 === "dark" ? "light" : "dark");
                    setTheme2(theme2 === "light" ? "dark" : "light");
                  }}
                >
                  {theme1 === "light" ? "Dark Theme" : "Light Theme"}
                </Button>
              </Container>
            </Navbar>
          </header>
          <main className={`bg-${theme1} text-${theme2}`}>
            <Container className="mt-3">
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Home theme2={theme2} theme1={theme1} />}
                />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route
                  exact
                  path="/product/:id"
                  element={<Product theme2={theme2} theme1={theme1} />}
                />

                <Route
                  exact
                  path="/cart"
                  element={<Cart theme2={theme2} theme1={theme1} />}
                />
                <Route render={() => <h1>404! This page doesn't exist</h1>} />
              </Routes>
            </Container>
          </main>
          <Footer theme2={theme2} />
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
