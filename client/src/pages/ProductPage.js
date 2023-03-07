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
    },
  });
  //const [users, setUsers] = useState([]);

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
                  src={`${product.product.image}`}
                  alt={product.name}
                />
              </Col>
              <Col md={6}>
                <Card className={``}>
                  <Card.Body>
                    <Card.Title className="mx-auto w-75 text-center">
                      {product.product.name}
                    </Card.Title>

                    <div className="mx-auto w-50 text-center">
                      <Rating
                        rating={product.product.rating}
                        numberofReviews={product.product.numberofReviews}
                      />
                    </div>

                    <Card.Text className="mx-auto w-50">
                      <b>Description: </b>
                      {product.product.description}
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Price:</b>
                      <span className="float-right">
                        ${product.product.price}
                      </span>
                    </Card.Text>

                    <Card.Text className="mx-auto w-50">
                      <b>Stock:</b>
                      <span className="float-right">
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
