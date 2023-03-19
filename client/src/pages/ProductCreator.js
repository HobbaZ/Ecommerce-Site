import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

const ProductCreator = () => {
  const [formInput, setFormInput] = useState({
    name: "",
    description: "",
    brand: "",
    category: "",
    price: "",
    limit: "",
    numberinStock: "",
    numberofReviews: 0,
    store: "",
    image: "",
    rating: 3.0,
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

        setFormInput({
          name: "",
          description: "",
          brand: "",
          category: "",
          price: "",
          limit: "",
          numberinStock: "",
          numberofReviews: 0,
          image: "",
        });
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
              <h1 className="text-center">Product Creator</h1>
              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">product Name</Form.Label>
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

                {formInput.name !== "" && formInput.name.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Product name needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="required">product Brand</Form.Label>
                  <Form.Control
                    type="text"
                    name="brand"
                    value={formInput.brand || ""}
                    placeholder="What is the product's brand or manufacturer?"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                {formInput.brand !== "" && formInput.brand.length < 5 && (
                  <p className="text-center text-danger" role="alert">
                    Product brand needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="required">
                    product Description
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={formInput.description || ""}
                    placeholder={`${formInput.name} sells a variety of products...`}
                    onChange={handleChange}
                    required
                    minLength={5}
                  />
                </Form.Group>

                {formInput.description !== "" &&
                  formInput.description.length < 5 && (
                    <p className="text-center text-danger" role="alert">
                      Product description needs to be at least 5 characters
                    </p>
                  )}

                <Form.Group className="mb-3">
                  <Form.Label className="required">product Price</Form.Label>
                  <Form.Control
                    type="currency"
                    name="price"
                    value={formInput.price || ""}
                    placeholder="Product price"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {formInput.price === "" && (
                  <p className="text-center text-danger" role="alert">
                    Product price is required
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="required">
                    Amount of Product in Stock
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="numberinStock"
                    value={formInput.numberinStock || ""}
                    placeholder="How much product do you have to sell?"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                {formInput.numberinStock === "" && (
                  <p className="text-center text-danger" role="alert">
                    Amount of product in stock is required
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>product Purchase Limit</Form.Label>
                  <Form.Control
                    type="number"
                    name="limit"
                    value={formInput.limit || ""}
                    placeholder="Product limit"
                    onChange={handleChange}
                  />
                </Form.Group>

                {formInput.limit === "" && (
                  <p className="text-center text-danger" role="status">
                    Leave default value if there is no purchase limit
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label className="required">product Category</Form.Label>
                  <Form.Select
                    name="category"
                    placeholder="Select or enter a category"
                    onChange={handleChange}
                    required
                    minLength={2}
                    tabIndex="0"
                  >
                    <option value="1">Clothing</option>
                    <option value="2">Memorabilia</option>
                    <option value="3">Trades/Services</option>
                    <option value="4">Vehicles</option>
                  </Form.Select>
                </Form.Group>

                {formInput.category !== "" && formInput.category.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Product category needs to be at least 2 characters
                  </p>
                )}

                <Form.Group className="mb-3">
                  <Form.Label>product Image</Form.Label>
                  <Form.Control
                    type="file"
                    multiple="multiple"
                    accept="image/png, image/jpeg"
                    name="productImage"
                    value={formInput.productImage || ""}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                {formInput.productImage !== "" && (
                  <p className="text-center text-danger" role="alert">
                    At least one product image is required
                  </p>
                )}

                <div className="text-center">
                  <Button
                    aria-disabled={
                      !formInput.name ||
                      !formInput.description ||
                      !formInput.productImage ||
                      !formInput.brand ||
                      !formInput.price ||
                      !formInput.numberinStock ||
                      !formInput.category
                    }
                    disabled={
                      !formInput.name ||
                      !formInput.description ||
                      !formInput.productImage ||
                      !formInput.brand ||
                      !formInput.price ||
                      !formInput.numberinStock ||
                      !formInput.category
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
