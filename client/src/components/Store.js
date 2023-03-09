import React from "react";

import { Container, Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import Rating from "./Rating";

const Store = ({ store }) => {
  return (
    <Container fluid>
      <Card key={store._id} className={`m-1`}>
        <Link to={`/stores/${store._id}`}>
          <img
            className="card-img-top"
            src={store.storeImage}
            alt={store.storeName}
          />
        </Link>
        <Card.Body>
          <Link to={`/stores/${store._id}`} store={store}>
            <Card.Title>{store.storeName}</Card.Title>
          </Link>

          {/*link to store*/}
          <Card.Subtitle>{store.storeDescription}</Card.Subtitle>
          <Rating rating={store.storeRating} />
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Store;
