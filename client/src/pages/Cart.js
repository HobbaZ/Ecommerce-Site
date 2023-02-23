import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { PaymentElement } from "@stripe/react-stripe-js";

import { ThemeContext } from "../Theme";

const Cart = () => {
  const { theme } = useContext(ThemeContext);

  document.title = "Your Cart";

  let cartItems = [];

  const total = () => {
    let ordertotal = 0;
    cartItems.length > 0
      ? cartItems.map((item) => {
          let itemTotal = item.quantity * item.price;
          return (ordertotal += itemTotal);
        })
      : (ordertotal = 0);
    return ordertotal;
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <div>
              Cart is empty. <Link to="/">Go Shopping</Link>
            </div>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <table className="align-items-center">
                    <tbody>
                      <tr>
                        <th></th>
                      </tr>

                      <tr>
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

                        <td>{item.price}</td>

                        <td>
                          <Button className={`background ${theme}`}>
                            <i className="fas fa-trash"></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card className={`bg-${theme}`}>
            <Card.Body>
              <div className={`background ${theme}`}>
                <Card.Title>Subtotal: ${total()}</Card.Title>
                <div className="text-center">
                  <Button
                    type="button"
                    variant="primary"
                    // disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>

                <form>
                  <PaymentElement total={total} />
                  <button>Submit</button>
                </form>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
