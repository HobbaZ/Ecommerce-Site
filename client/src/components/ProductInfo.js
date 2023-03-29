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
    window.location.replace(`/products/${productInfo}`);
  }

  return (
    <>
      <td>
        <Link to={`/products/${product.product?._id}`}>
          <img
            className="card-img-top"
            src={product.product?.image}
            alt={product.product?.name}
          />
        </Link>
      </td>

      <td>
        <Link to={`/products/${product.product?._id}`}>
          <h6>{product.product?.name}</h6>
        </Link>
      </td>

      <td>
        <Rating
          rating={product.product?.rating}
          numberofReviews={product.product?.numberofReviews}
        />
      </td>

      <td>${product.product?.price}</td>
      <td>{product.product?.numberinStock}</td>
      <td>{product.product?.numberofReviews}</td>

      <td>
        <Button type="button" className="my-2 w-100" onClick={editProduct}>
          Edit Product <i className="fas fa-pen"></i>
        </Button>
      </td>

      <td>
        <Button
          variant="danger"
          type="button"
          className="my-2 w-100"
          onClick={deleteProduct}
        >
          Delete Product <i className="fas fa-trash-alt"></i>
        </Button>
      </td>
    </>
  );
}

export default ProductInfo;
