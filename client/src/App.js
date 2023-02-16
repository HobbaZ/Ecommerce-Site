import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Product from "./pages/ProductPage";
import Footer from "./components/Footer";

import "./App.css";
import { Container } from "react-bootstrap";
import Cart from "./pages/Cart";
import AppNavbar from "./components/NavBar";

import { ThemeProvider } from "./Theme";
import { UserProvider, useCurrentUser } from "./LoggedInUser";

function App() {
  const { currentUser, fetchCurrentUser } = useCurrentUser() ?? {};
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <div>
            <AppNavbar currentuser={currentUser} />
          </div>

          <main>
            <Container>
              <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/product/:id" element={<Product />} />

                <Route exact path="/cart" element={<Cart />} />
                <Route render={() => <h1>404! This page doesn't exist</h1>} />
              </Routes>
            </Container>
          </main>
          <Footer />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
