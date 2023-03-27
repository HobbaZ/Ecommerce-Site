import { useEffect, useState } from "react";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState({
    product: {
      name: "",
      image: "",
      rating: 0,
      numberofReviews: 0,
      description: "",
      price: 0,
      numberinStock: 0,
      limit: 0,
      store: "",
    },
  });

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);

        if (!response.ok) {
          setLoading(false);
          throw new Error(
            "something went wrong getting product data!",
            response
          );
        }

        const productData = await response.json();
        document.title = `${productData.product.name}`;
        setProduct(productData);
        console.log(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, [id]);

  function addToCartHandler() {}

  return (
    <>
      <Container fluid>
        <div>
          {loading ? (
            <div className="d-flex justify-content-center" role="alert">
              <Loading />
            </div>
          ) : error ? (
            <div
              className="text-center text-danger d-flex justify-content-center"
              role="alert"
            >
              {error}
            </div>
          ) : (
            <Row>
              <Col sm={12} md={6} lg={4}>
                <div className="text-center">
                  <img
                    className="img-large mb-2 col-sm-12"
                    tabIndex="0"
                    src={`${product.product.image}`}
                    alt={product.product.name}
                  />
                </div>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <Card>
                  <Card.Body className="w-100">
                    <Card.Title
                      className="mx-auto w-75 text-center"
                      tabIndex="0"
                    >
                      {product.product.name}
                    </Card.Title>

                    <Card.Subtitle
                      className="mx-auto w-75 text-center"
                      tabIndex="0"
                    >
                      Store {product.product.store._id}
                    </Card.Subtitle>

                    <Card.Text className="mx-auto w-75">
                      <span className="sr-only sr-only-focusable" tabIndex="0">
                        Rating: {product.product.rating} out of 5 stars
                      </span>

                      <Rating
                        aria-hidden="true"
                        rating={product.product.rating}
                        numberofReviews={product.product.numberofReviews}
                      />
                    </Card.Text>

                    <Card.Text className="mx-auto w-75" tabIndex="0">
                      <b>Description: </b>
                      {product.product.description}
                    </Card.Text>

                    <Card.Text className="mx-auto w-75" tabIndex="0">
                      <b>Price: </b>${product.product.price}
                    </Card.Text>

                    <Card.Text className="mx-auto w-75" tabIndex="0">
                      <b>Stock: </b>
                      <span>
                        {product.product.numberinStock > 0 ? (
                          <Badge bg="success">
                            {product.product.numberinStock} Available
                          </Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </span>
                    </Card.Text>

                    {/*<div className="mx-auto w-50">
                      {product.product.numberinStock > 0 ? (
                        <div>
                          <b>Purchase Limit:</b>
                          <span className="float-right">{`${product.product.limit} per customer`}</span>
                        </div>
                      ) : null}
                      </div>*/}

                    <br />
                    <div className="mx-auto w-50">
                      {product.product.numberinStock > 0 && (
                        <div>
                          <Button className={``} onClick={addToCartHandler}>
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
