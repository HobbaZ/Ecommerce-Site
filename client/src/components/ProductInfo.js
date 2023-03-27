import React, { useState, useEffect } from "react";

import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Rating from "./Rating";

function ProductInfo({ productInfo }) {
  const [infoMessage, setInfoMessage] = useState("");

  const [product, setProduct] = useState([]);

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${productInfo}`);

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
  }, [productInfo]);

  //Delete product if logged in
  const deleteProduct = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(
        `/api/products/delete/${product.product._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("something went wrong with deleting product!");
      }

      //Delete product account, destroy access token and redirect to signup page if successful
      setInfoMessage("product deleted!");
      console.log("product deleted");
      window.location.replace("/myproducts");
    } catch (err) {
      console.error(err);
    }
  };

  function editProduct() {
    window.location.replace(`/products/${product.product?._id}`);
  }

  return (
    <Card key={product.product?._id}>
      <Link to={`/products/${product.product?._id}`}>
        <img
          className="card-img-top"
          src={product.product?.image}
          alt={product.product?.name}
        />
      </Link>
      <Card.Body>
        <Link to={`/products/${product.product?._id}`}>
          <Card.Title>{product.product?.name}</Card.Title>
        </Link>

        {/*link to product*/}
        <Rating
          rating={product.product?.rating}
          numberofReviews={product.product?.numberofReviews}
        />
        <Card.Text>
          <b>Price: </b>${product.product?.price}
        </Card.Text>
        <Card.Text>
          <b>In Stock:</b> {product.product?.numberinStock}
        </Card.Text>
        <Card.Text>
          <b>Reviews:</b> {product.product?.numberofReviews}
        </Card.Text>

        <div className="text-center">
          <Button type="button" className="my-2 w-75" onClick={editProduct}>
            Edit Product <i className="fas fa-pen"></i>
          </Button>
        </div>

        <div className="text-center">
          <Button
            variant="danger"
            type="button"
            className="my-2 w-75"
            onClick={deleteProduct}
          >
            Delete Product <i className="fas fa-trash-alt"></i>
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductInfo;
