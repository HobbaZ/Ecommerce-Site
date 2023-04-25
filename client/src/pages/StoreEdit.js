import React, { useEffect, useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

import { useParams } from "react-router-dom";

const StoreEdit = () => {
  const [storeData, setStoreData] = useState({});

  const [formInput, setFormInput] = useState({
    storeName: storeData.storeName,
    storeDescription: storeData.storeDescription,
    storeImage: storeData.storeImage,
  });

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getstoreData = async () => {
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : window.location.replace("/login");

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch(`/api/stores/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setInfoMessage("something went wrong getting store data!");
          throw new Error("something went wrong getting store data!");
        }

        const storeInfo = await response.json();
        document.title = `${storeInfo.store.storeName}`;
        setStoreData(storeInfo);
        console.log(storeInfo);
      } catch (err) {
        console.error(err);
      }
    };

    getstoreData();
  }, [id]);

  //Delete store if logged in
  const deleteStore = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/stores/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong with deleting store!");
      }

      //Delete store
      setInfoMessage("Store deleted!");
      console.log("store deleted");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  function cancelAction() {
    setFormInput("");
    window.location.replace("/mystores");
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

      const response = await fetch(`/api/stores/${id}`, {
        method: "PUT",
        body: JSON.stringify({ ...formInput }),
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.log(response);
        throw new Error("something went wrong updating the store details!");
      }

      const store = await response.json();
      console.log(store);
      setInfoMessage("Details updated!");
      setStoreData(store);
      window.location.replace(`/mystores`);
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

  return (
    <Container fluid>
      <div className="col-sm-8 col-md-4 mt-5 mx-auto">
        <>
          {Auth.loggedIn() && Auth.getProfile().data.isAdmin && (
            <>
              <h2 className="text-center" tabIndex="0">
                Editing {storeData.store?.storeName}
              </h2>

              {infoMessage && <div className="text-center">{infoMessage}</div>}

              <Form onSubmit={handleSubmit} className="mx-auto">
                <Form.Group className="mb-3">
                  <label>Update Store Name</label>
                  <Form.Control
                    type="text"
                    name="storeName"
                    value={formInput.storeName || storeData.store?.storeName}
                    placeholder={storeData.store?.storeName}
                    onChange={handleChange}
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Update Store Description</label>
                  <textarea
                    type="text"
                    name="storeDescription"
                    rows={5}
                    className="w-100"
                    value={
                      formInput.storeDescription ||
                      storeData.store?.storeDescription
                    }
                    placeholder={storeData.storeDescription}
                    onChange={handleChange}
                    minLength={2}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Update Store Image</label>
                  <Form.Control
                    type="file"
                    accept="image/png, image/jpeg"
                    name="storeImage"
                    placeholder={storeData.store?.storeImage}
                    onChange={handleChange}
                    minLength={2}
                  />
                </Form.Group>

                {infoMessage && (
                  <div className="text-center">{infoMessage}</div>
                )}

                <div className="text-center">
                  <Button variant="primary" type="submit" className="my-2 w-50">
                    Update Store
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

                <hr />

                <div className="text-center">
                  <Button
                    variant="danger"
                    className="my-2 w-50"
                    onClick={deleteStore}
                  >
                    Delete Store <i className="fas fa-trash-alt"></i>
                  </Button>
                  <p className="text-center text-danger">
                    Warning: Deleting your store will also delete all your
                    products in the store. This is permanent and can't be
                    undone.
                  </p>
                </div>
              </Form>
            </>
          )}
        </>
      </div>
    </Container>
  );
};

export default StoreEdit;
