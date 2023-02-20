import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

const ProductCreator = () => {
  const [formInput, setFormInput] = useState({
    productName: "",
    productDescription: "",
    productOwner: "",
    productImage: "",
    productRating: "",
  });

  document.title = "product Creator";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to create user endpoint
    try {
      const response = await fetch(`api/product/create`, {
        method: "POST",
        body: JSON.stringify({ ...formInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong!");
      }

      const { token } = await response.json();
      Auth.login(token);

      setFormInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setFormInput({ ...formInput, [name]: value });
  };

  return (
    <>
      {Auth.loggedIn() ? (
        <Container fluid>
          <div className="col-sm-8 col-md-4 mt-5 mx-auto">
            <div>
              <h1 className="text-center">product Creator</h1>
              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <Form.Label>product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="productName"
                    value={formInput.productName.trim() || ""}
                    placeholder="Your product Name"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>product Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="productDescription"
                    value={formInput.productDescription.trim() || ""}
                    placeholder={`${formInput.productName} sells a variety of products...`}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>product Image</Form.Label>
                  <Form.Control
                    type="email"
                    name="productImage"
                    value={formInput.productImage.trim() || ""}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    disabled={
                      !formInput.productName ||
                      !formInput.productDescription ||
                      !formInput.productImage ||
                      !formInput.productRating
                    }
                    variant="primary"
                    type="submit"
                    className="my-2 w-50"
                  >
                    {`Create ${formInput.productName}`}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </Container>
      ) : (
        window.location.replace("/login")
      )}
    </>
  );
};

export default ProductCreator;
