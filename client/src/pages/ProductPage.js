import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { Loading } from "../components/Loading";

const ProductPage = () => {
  const params = useParams();
  const { slug } = params;

  const [product, setProduct] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${slug}`, {
          method: "GET",
        });

        if (!response.ok) {
          setInfoMessage("something went wrong getting product data");
          throw new Error("something went wrong getting product data!");
        }

        const productData = await response.json();
        document.title = `${productData.name}`;
        setProduct(productData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [slug]);

  return (
    <>
      <Container>
        <div>
          {loading ? (
            <Loading />
          ) : infoMessage ? (
            <div className="text-center errMessage">{infoMessage}</div>
          ) : (
            <Row>
              <Col md={6}>
                <img
                  className="img-large"
                  scr={product.image}
                  alt={product.name}
                ></img>
              </Col>

              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h1>{product.name}</h1>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Rating
                      rating={product.rating}
                      numberofReviews={product.numberofReviews}
                    ></Rating>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p>
                      <b>Price: </b>${product.price}
                    </p>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <p>
                      <b>Description: </b>
                      {product.description}
                    </p>
                  </ListGroup.Item>
                </ListGroup>
              </Col>

              <Col md={3}>
                <Card>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <b>Price:</b>
                          </Col>
                          <Col>${product.price}</Col>
                        </Row>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Row>
                          <Col>
                            <b>Stock:</b>
                          </Col>
                          <Col>
                            {product.numberinStock > 0 ? (
                              <Badge bg="success">In Stock</Badge>
                            ) : (
                              <Badge bg="danger">Unavailable</Badge>
                            )}
                          </Col>
                        </Row>
                      </ListGroup.Item>

                      {product.numberinStock > 0 && (
                        <ListGroup.Item>
                          <div className="d-grid">
                            <Button variant="primary">Add to Cart</Button>
                          </div>
                        </ListGroup.Item>
                      )}
                    </ListGroup>
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
