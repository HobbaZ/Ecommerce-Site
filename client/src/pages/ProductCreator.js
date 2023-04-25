import React, { useState, useEffect } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";
import CategoryOptions from "../components/CategoryOptions";

const ProductCreator = () => {
  const [stores, setStoreData] = useState([]);

  // state for messages
  const [error, setError] = useState("");

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

    //Send data to create product endpoint
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      if (!token) {
        console.log("Need to be logged in to do this");
        window.location.replace("/login");
        return false;
      }

      const response = await fetch(`api/products/create`, {
        method: "POST",
        body: JSON.stringify({ ...formInput }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("something went wrong creating product!", response);
      }

      console.log(response);
      window.location.replace("/myproducts");
      setFormInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = async (event) => {
    const { name, value } = event.target;

    if (name === "store") {
      const selectedStore = stores.find(
        (store) => store.store.storeName === value
      );
      // Set the store field to the selected store's ID
      setFormInput({
        ...formInput,
        [name]: selectedStore.store._id.toString(),
      });
      console.log(formInput.store);
    } else {
      setFormInput({ ...formInput, [name]: value });
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : window.location.replace("/login");

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch(`/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("something went wrong getting user data!");
          throw new Error("something went wrong getting user data!");
        }

        const user = await response.json();

        const storeData = await Promise.all(
          user.stores.map(async (storeId) => {
            const storeResponse = await fetch(`/api/stores/${storeId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization: `Bearer ${token}`,
              },
            });
            if (!storeResponse.ok) {
              throw new Error(`Failed to fetch store ${storeId}`);
            }
            return storeResponse.json();
          })
        );

        console.log(storeData);
        setStoreData(storeData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      {Auth.loggedIn() && Auth.getProfile().data.isAdmin ? (
        <Container fluid>
          <div className="col-sm-8 col-md-4 mt-5 mx-auto">
            <div>
              <h1 className="text-center">Product Creator</h1>

              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <Form.Label className="required">Product Name</Form.Label>
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
                  <Form.Label className="required">
                    Which Store Will This Product Belong To
                  </Form.Label>
                  <Form.Select
                    name="store"
                    onChange={handleChange}
                    required
                    tabIndex="0"
                  >
                    {stores.length > 0 &&
                      stores.map((store) => (
                        <>
                          <option value="None">None</option>
                          <option key={store.id} value={store.id}>
                            {store.store.storeName}
                          </option>
                        </>
                      ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="required">Product Brand</Form.Label>
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
                    Product Description
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
                  <Form.Label className="required">Product Price</Form.Label>
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
                  <Form.Label>Product Purchase Limit</Form.Label>
                  <Form.Control
                    type="number"
                    name="limit"
                    value={formInput.limit || "0"}
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
                  <Form.Label className="required">Product Category</Form.Label>
                  <Form.Select
                    name="category"
                    placeholder="Select or enter a category"
                    onChange={handleChange}
                    required
                    tabIndex="0"
                  >
                    <CategoryOptions />
                  </Form.Select>
                </Form.Group>

                {/*formInput.category !== "" && formInput.category.length < 2 && (
                  <p className="text-center text-danger" role="alert">
                    Product category needs to be at least 2 characters
                  </p>
                )*/}

                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    multiple="multiple"
                    accept="image/png, image/jpeg"
                    name="productImage"
                    value={formInput.productImage}
                    onChange={handleChange}
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
                      !formInput.brand ||
                      !formInput.price ||
                      !formInput.numberinStock
                    }
                    disabled={
                      !formInput.name ||
                      !formInput.description ||
                      !formInput.brand ||
                      !formInput.price ||
                      !formInput.numberinStock
                    }
                    variant="primary"
                    type="submit"
                    className="my-2 w-50"
                  >
                    Create Product
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
