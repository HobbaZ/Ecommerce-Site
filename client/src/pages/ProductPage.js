//The Api for the slug is getting http://localhost:3000/product/adidas-shirt instead of http://localhost:3000/product/item/adidas-shirt

import { useEffect, useState } from "react";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Loading } from "../components/Loading";

const ProductPage = (props) => {
  const { theme1, theme2 } = props;

  const [product, setProduct] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/product/${product._id}`);

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
  }, [product._id]);

  function addToCartHandler() {}

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
