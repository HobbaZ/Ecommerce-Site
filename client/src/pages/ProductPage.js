//The Api for the slug is getting http://localhost:3000/product/adidas-shirt instead of http://localhost:3000/product/item/adidas-shirt

import { useEffect, useState } from "react";

import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { Loading } from "../components/Loading";
import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [product, setProduct] = useState([]);
  //const [users, setUsers] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect((id) => {
    document.title = "Product";

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
        setProduct(productData);
        console.log(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, []);

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
                  src={`${product.products.image}`}
                  alt={product.products.name}
                ></img>
              </Col>
              <Col md={6}>
                <Card className={``}>
                  <Card.Body>
                    <Card.Title className="mx-auto w-75 text-center">
                      {product.products.name}
                    </Card.Title>

                    <div className="mx-auto w-50 text-center">
                      <Rating
                        rating={product.products.rating}
                        numberofReviews={product.products.numberofReviews}
                      />
                    </div>

                    <Card.Text className="mx-auto w-50">
                      <b>Description: </b>
                      {product.products.description}
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Price:</b>
                      <span className="float-right">
                        ${product.products.price}
                      </span>
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Stock:</b>
                      <span className="float-right">
                        {product.products.numberinStock > 0 ? (
                          <Badge bg="success">
                            {product.products.numberinStock} Available
                          </Badge>
                        ) : (
                          <Badge bg="danger">Unavailable</Badge>
                        )}
                      </span>
                    </Card.Text>

                    {/*<div className="mx-auto w-50">
                      {product.products.numberinStock > 0 ? (
                        <div>
                          <b>Purchase Limit:</b>
                          <span className="float-right">{`${product.products.limit} per customer`}</span>
                        </div>
                      ) : null}
                      </div>*/}

                    <br />
                    <div className="mx-auto w-50">
                      {product.products.numberinStock > 0 && (
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
