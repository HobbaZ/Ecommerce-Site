import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

const ProductCreator = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    store: "",
    image: "",
    rating: "",
  });

  document.title = "product Creator";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to create user endpoint
    try {
      const response = await fetch(`api/products/create`, {
        method: "POST",
        body: JSON.stringify({ ...formInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log(response);
        const { token } = await response.json();
        Auth.login(token);

        setFormInput({ name: "", description: "", image: "", rating: "" });
      } else {
        console.log(response);
        throw new Error("something went wrong!");
      }
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
                    name="name"
                    value={formInput.name || ""}
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
                    name="description"
                    value={formInput.description || ""}
                    placeholder={`${formInput.name} sells a variety of products...`}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    name="productImage"
                    value={formInput.productImage || ""}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    disabled={
                      !formInput.name ||
                      !formInput.description ||
                      !formInput.productImage ||
                      !formInput.productRating
                    }
                    variant="primary"
                    type="submit"
                    className="my-2 w-50"
                  >
                    {`Create ${formInput.name}`}
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
