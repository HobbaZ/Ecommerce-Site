import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-bootstrap";
import Product from "../components/Product";
import { Loading } from "../components/Loading";

const Home = () => {
  const [products, setProducts] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  useEffect(() => {
    document.title = "Home";

    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          setInfoMessage("something went wrong getting product data");
          throw new Error("something went wrong getting product data!");
        }

        const productData = await response.json();
        setProducts(productData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      <Container>
        <div>
          <h1>Featured Products</h1>
          <div className="products">
            {loading ? (
              <Loading />
            ) : infoMessage ? (
              <div className="text-center errMessage">{infoMessage}</div>
            ) : (
              <Row>
                {products.map((product) => (
                  <Col key={product.slug} sm={6} md={4} lg={3}>
                    <Product product={product}></Product>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
