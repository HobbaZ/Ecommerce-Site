import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import Product from "./Product";
import Rating from "./Rating";

function UserList({ products }) {
  return (
    <div>
      <h2>Products</h2>
      <Col>
        {products.products?.length > 0 ? (
          products.products.map((product) => (
            <Card
              key={product._id}
              className="product"
              //className={`bg-${theme1} text-${theme2} border border-${theme2}`}
            >
              <Link to={`/product/${product._id}`}>
                <img
                  className="card-img-top img_thumbnail"
                  src={product.image}
                  alt={product.name}
                />
              </Link>
              <Card.Body>
                <Link to={`/product/${product._id}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <Rating
                  rating={product.rating}
                  numberofReviews={product.numberofReviews}
                />
                <Card.Text>${product.price}</Card.Text>
                <Button
                //className={`bg-${theme1} text-${theme2} border border-${theme2} w-100 productButton`}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>no products</div>
        )}
      </Col>
    </div>
  );
}

export default UserList;
