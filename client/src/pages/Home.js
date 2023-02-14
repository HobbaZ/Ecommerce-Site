import React, { useEffect, useState, useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-bootstrap";
import Product from "../components/Product";
import { Loading } from "../components/Loading";

import { ThemeContext } from "../Theme";

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [products, setProducts] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "Home";

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products");

        if (!response.ok) {
          setLoading(false);
          throw new Error("something went wrong getting product data!");
        }

        const productData = await response.json();
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Container>
        <div className={`background ${theme}`}>
          <div className={`background ${theme}`}>
            <h1>Featured Products</h1>
            <div className="products">
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loading />
                </div>
              ) : error ? (
                <div className="text-danger d-flex justify-content-center">
                  {error}
                </div>
              ) : (
                <Row className={`background ${theme}`}>
                  {products.map((product) => (
                    <Col key={product._id} sm={6} md={4} lg={3}>
                      <Product product={product}></Product>
                    </Col>
                  ))}
                </Row>
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
