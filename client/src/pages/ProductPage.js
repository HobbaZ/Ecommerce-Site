//Change addToCartHandler from using useReducer to using useState

import { useEffect, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Loading } from "../components/Loading";
import { Store } from "../Store";

const ProductPage = (props) => {
  const { theme1, theme2 } = props;

  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/item/${slug}`, {
          method: "GET",
        });

        if (!response.ok) {
          setLoading(false);
          throw new Error("something went wrong getting product data!");
        }

        const productData = await response.json();
        document.title = `${productData.name}`;
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    //if product number of product exists it the cart, if so increase by 1
    const itemQuantity = cart.cartItems.find(
      (x) => parseInt(x._id) === product._id
    );
    const quantity = itemQuantity ? itemQuantity.quantity + 1 : 1;

    const { data } = await fetch(`/api/products/${product._id}`, {
      method: "GET",
    });

    /*const purchaseLimit =
      itemQuantity.quantity > data.limit
        ? itemQuantity.quantity
        : itemQuantity.quantity + 1;

    if (purchaseLimit > data.limit) {
      window.alert(`Sorry, you are over the puchase limit for ${product.name}`);
      return;
    }*/

    if (quantity > data.numberinStock) {
      window.alert(`Sorry, ${product.name} is out of stock`);
      return;
    }

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...product, quantity },
    });
  };

  return (
    <>
      <Container>
        <div>
          {loading ? (
            <div className="d-flex justify-content-center">
              <Loading />
            </div>
          ) : error ? (
            <div className="text-center text-danger d-flex justify-content-center">
              {error}
            </div>
          ) : (
            <Row>
              <Col md={6}>
                <img
                  className="img-large mb-2"
                  src={`${product.image}`}
                  alt={product.name}
                ></img>
              </Col>
              <Col md={6}>
                <Card className={`bg-${theme1} text-${theme2} border border-0`}>
                  <Card.Body>
                    <Card.Title className="mx-auto w-75 text-center">
                      {product.name}
                    </Card.Title>

                    <div className="mx-auto w-50 text-center">
                      <Rating
                        rating={product.rating}
                        numberofReviews={product.numberofReviews}
                      />
                    </div>

                    <Card.Text className="mx-auto w-50">
                      <b>Description: </b>
                      {product.description}
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Price:</b>
                      <span className="float-right">${product.price}</span>
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Stock:</b>
                      <span className="float-right">
                        {product.numberinStock > 0 ? (
                          <Badge bg="success">
                            {product.numberinStock} Available
                          </Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </span>
                    </Card.Text>

                    {/*<div className="mx-auto w-50">
                      {product.numberinStock > 0 ? (
                        <div>
                          <b>Purchase Limit:</b>
                          <span className="float-right">{`${product.limit} per customer`}</span>
                        </div>
                      ) : null}
                      </div>*/}

                    <br />
                    <div className="mx-auto w-50">
                      {product.numberinStock > 0 && (
                        <div>
                          <Button
                            className={`bg-${theme1} text-${theme2} border border-${theme2} w-100`}
                            onClick={addToCartHandler}
                          >
                            Add to Cart
                          </Button>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
        </div>
      </Container>
    </>
  );
};

export default ProductPage;
