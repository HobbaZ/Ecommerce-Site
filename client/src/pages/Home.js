import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-bootstrap";
import Product from "../components/Product";
import { Loading } from "../components/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);
  //const [users, setUsers] = useState([]);

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
          throw new Error(
            "something went wrong getting product data!",
            response
          );
        }

        const productData = await response.json();
        setProducts(productData);
        console.log(productData);
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
      <Container fluid>
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
            <Row>
              {products.products?.length > 0 ? (
                products.products.map((product) => (
                  <Col key={product._id} sm={6} md={4} lg={3}>
                    <Product product={product}></Product>
                  </Col>
                ))
              ) : (
                <div>No products yet</div>
              )}
            </Row>
          )}
        </div>
      </Container>
    </>
  );
};

export default Home;
