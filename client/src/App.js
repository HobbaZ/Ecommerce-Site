import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/ProductPage";
import Footer from "./components/Footer";

import "./App.css";
import { Container, Navbar } from "react-bootstrap";

function App() {
  return (
    <Router>
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar bg="dark" varient="dark">
            <Container>
              <Navbar.Brand>
                <Link to="/">E Commerce Site</Link>
              </Navbar.Brand>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/product/:slug" element={<Product />} />
              <Route render={() => <h1>404! This page doesn't exist</h1>} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
