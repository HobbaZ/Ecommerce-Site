import React from "react";

import { useParams, Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";

const Product = () => {
  const params = useParams();
  const { slug } = params;

  return (
    <>
      <Container>
        <h1 className="text-center">Product</h1>
        <p>{slug}</p>
      </Container>
    </>
  );
};

export default Product;
