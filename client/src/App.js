import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/ProductPage";
import Footer from "./components/Footer";
import StoreCreator from "./pages/StoreCreator";
import ProductCreator from "./pages/ProductCreator";
import ContactMe from "./pages/ContactMe";
import Payment from "./pages/Payment";

import "./App.css";
import { Container } from "react-bootstrap";
import Cart from "./pages/Cart";
import AppNavbar from "./components/NavBar";

import { ThemeProvider } from "./Theme";

function App() {
  return (
    <>
      <ThemeProvider>
        <Router>
          <div>
            <AppNavbar />
          </div>

          <main>
            <Container>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/product/:id" element={<Product />} />
                <Route exact path="/storecreator" element={<StoreCreator />} />
                <Route exact path="/contactus" element={<ContactMe />} />
                <Route exact path="/payment" element={<Payment />} />
                <Route
                  exact
                  path="/productcreator"
                  element={<ProductCreator />}
                />

                <Route exact path="/cart" element={<Cart />} />
                <Route render={() => <h1>404! This page doesn't exist</h1>} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;
