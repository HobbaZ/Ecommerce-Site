import React, { useState, useEffect } from "react";

import { Button, Card, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Rating from "./Rating";

function ProductInfo({ productInfo }) {
  const [productData, setProductData] = useState({});

  const [formInput, setFormInput] = useState({
    name: productData.name,
    description: productData.description,
    brand: productData.brand,
    category: productData.category,
    price: productData.price,
    limit: productData.limit,
    numberinStock: productData.numberinStock,
    store: productData.store,
    image: productData.image,
  });

  const [showEditForm, setShowEditForm] = useState(false);

  // state for messages
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

  function cancelAction() {
    setFormInput("");
    setShowEditForm(false);
  }

  //Update function for form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to update store endpoint
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(
        `/api/products/update/${product.product._id}`,
        {
          method: "PUT",
          body: JSON.stringify({ ...formInput }),
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong updating the product details!");
      }

      const product = await response.json();
      console.log(product);
      setInfoMessage("Product details updated!");
      setProductData(product);
      window.location.replace(`/myproducts`);
      setFormInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name } = event.target;
    setFormInput({
      ...formInput,
      [name]: event.target.value,
    });
  };

  function editProduct() {
    setShowEditForm(!showEditForm);
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
      {showEditForm && (
        <>
          <div className="editProductModal">
            <Container fluid>
              <hr />
              <div className="w-100 m-auto">
                <h3 className="text-center">Update Product Details</h3>
                <Form onSubmit={handleSubmit} className="mx-auto">
                  <Form.Group className="mb-3">
                    <Form.Label>Update Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="storeName"
                      value={formInput.name || product.product?.name}
                      placeholder={product.product?.name}
                      onChange={handleChange}
                      minLength={2}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Update Product Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="storeDescription"
                      value={
                        formInput.description || product.product?.description
                      }
                      placeholder={product.product?.description}
                      onChange={handleChange}
                      minLength={2}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Update Product Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="storeDescription"
                      value={formInput.price || product.product?.price}
                      placeholder={product.product?.price}
                      onChange={handleChange}
                      minLength={2}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Update Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/png, image/jpeg"
                      name="productImage"
                      placeholder={formInput.image}
                      onChange={handleChange}
                      minLength={2}
                    />
                  </Form.Group>

                  {infoMessage && (
                    <div className="text-center">{infoMessage}</div>
                  )}

                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="submit"
                      className="my-2 w-50"
                    >
                      Update
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      onClick={cancelAction}
                      variant="danger"
                      type="button"
                      className="my-2 w-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </div>
              <hr />
            </Container>
          </div>
        </>
      )}
      ;
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
