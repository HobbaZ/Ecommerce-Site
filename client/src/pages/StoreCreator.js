import React, { useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

const StoreCreator = () => {
  //const [existingStoreName, checkExistingStoreName] = useState("");

  const [formInput, setFormInput] = useState({
    storeName: "",
    storeDescription: "",
    storeOwner: "",
    storeImage: "",
    storeRating: "",
  });

  document.title = "Store Creator";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formInput) {
      return false;
    }

    //Send data to create user endpoint
    try {
      const response = await fetch(`api/store/create`, {
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
              <h1 className="text-center">Store Creator</h1>
              <Form onSubmit={handleSubmit} className={`mx-auto`}>
                <Form.Group className="mb-3">
                  <Form.Label>Store Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="storeName"
                    value={formInput.storeName.trim() || ""}
                    placeholder="Your Store Name"
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Store Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="storeDescription"
                    value={formInput.storeDescription.trim() || ""}
                    placeholder={`${formInput.storeName} sells a variety of products...`}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Store Image</Form.Label>
                  <Form.Control
                    type="email"
                    name="storeImage"
                    value={formInput.storeImage.trim() || ""}
                    onChange={handleChange}
                    required
                    minLength={2}
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    disabled={
                      !formInput.storeName ||
                      !formInput.storeDescription ||
                      !formInput.storeImage ||
                      !formInput.storeRating
                    }
                    variant="primary"
                    type="submit"
                    className="my-2 w-50"
                  >
                    {`Create ${formInput.storeName}`}
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

export default StoreCreator;