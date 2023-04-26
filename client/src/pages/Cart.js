import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { ThemeContext } from "../Theme";

const Cart = () => {
  const { theme } = useContext(ThemeContext);

  document.title = "Your Cart";

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const products = JSON.parse(localStorage.getItem("cartProducts")) || [];
        setCartProducts(products);
      } catch (err) {
        console.error(err);
        return [];
      }
    };
    getData();
  }, []);

  //Delete product if logged in
  const deleteCartProduct = async (product) => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      if (!token) {
        console.log("Need to be logged in to do this");
        window.location.replace("/login");
        return false;
      }

      const cartProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];

      // Find the index of the product to be removed
      const index = cartProducts.findIndex(
        (productToRemove) => productToRemove._id === product._id
      );

      // Remove the product from the array using splice method
      if (index !== -1) {
        cartProducts.splice(index, 1);
      }

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      console.log("Product removed from cart successfully!");
      setCartProducts(cartProducts);
    } catch (err) {
      console.error(err);
    }
  };

  const total = () => {
    let ordertotal = 0;
    cartProducts.length > 0
      ? cartProducts.map((item) => {
          let itemTotal = item.quantity * item.price;
          return (ordertotal += itemTotal);
        })
      : (ordertotal = 0);
    return ordertotal;
  };

  return (
    <div>
      <h1 className="text-center" tabIndex="0">
        Shopping Cart
      </h1>

      <Row>
        <Col md={8}>
          {cartProducts.length === 0 ? (
            <div className="text-center">
              Cart is empty. <Link to="/">Go Shopping</Link>
            </div>
          ) : (
            <ListGroup>
              <table className="align-items-center">
                <tbody>
                  <tr>
                    <th>Heading</th>
                  </tr>
                  {cartProducts.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />
                        <Link to={`/product/${item._id}`}>{item.name}</Link>
                      </td>
                      <td>
                        <Button
                          className={`background ${theme}`}
                          disabled={item.quantity === 1}
                        >
                          <i className="fas fa-minus-circle"></i>
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          className={`background ${theme}`}
                          disabled={item.quantity === item.numberinStock}
                        >
                          <i className="fas fa-plus-circle"></i>
                        </Button>
                      </td>

                      <td>${item.price}</td>

                      <td>
                        <Button
                          variant="danger"
                          type="button"
                          className={`bg-danger`}
                          onClick={() => deleteCartProduct(item)}
                        >
                          Delete <i className="fas fa-trash-alt"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className={`background ${theme}`}>
            <Card.Body>
              <div className={`background ${theme} text-center`}>
                <Card.Title>Subtotal: ${total()}</Card.Title>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="primary"
                    // disabled={cartProducts.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
