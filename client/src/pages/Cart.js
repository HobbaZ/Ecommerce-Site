import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Store } from "../Store";

const Cart = () => {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  document.title = "Your Cart";

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
                          <Link to={`/product/${item.slug}`}>{item.name}</Link>
                        </td>
                        <td>
                          <Button
                            variant="light"
                            disabled={item.quantity === 1}
                          >
                            <i className="fas fa-minus-circle"></i>
                          </Button>
                          <span>{item.quantity}</span>
                          <Button
                            variant="light"
                            disabled={item.quantity === item.numberinStock}
                          >
                            <i className="fas fa-plus-circle"></i>
                          </Button>
                        </td>

                        <td>{item.price}</td>

                        <td>
                          <Button variant="light">
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
          <Card>
            <Card.Body>
              <Card.Title>
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)} items)
                : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
              </Card.Title>

              <Button
                type="button"
                variant="primary"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Cart;
