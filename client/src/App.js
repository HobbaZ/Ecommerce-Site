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
import MyOrders from "./pages/MyOrders";
import MyStores from "./pages/MyStores";
import StoreInfo from "./pages/StoreInfo";
import Cart from "./pages/Cart";

import "./App.css";
import { Container } from "react-bootstrap";

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
            <Container id="maincontent">
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route
                  exact
                  path="/products/create"
                  element={<ProductCreator />}
                />
                <Route exact path="/products/:id" element={<Product />} />
                <Route exact path="/storecreator" element={<StoreCreator />} />
                <Route exact path="/contactus" element={<ContactMe />} />
                <Route exact path="/mystores" element={<MyStores />} />
                <Route exact path="/stores/:id" element={<StoreInfo />} />
                <Route exact path="/myorders" element={<MyOrders />} />

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
