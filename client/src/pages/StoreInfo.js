import React, { useEffect, useState } from "react";

import { Container, Button, Form } from "react-bootstrap";

import Auth from "../utils/auth";

import { useParams } from "react-router-dom";

const StoreInfo = () => {
  const [storeData, setStoreData] = useState({});

  const [formInput, setFormInput] = useState({
    storeName: storeData.storeName,
    storeDescription: storeData.storeDescription,
    storeImage: storeData.storeImage,
  });

  const [showEditForm, setShowEditForm] = useState(false);

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

      const response = await fetch(`/api/stores/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong with deleting store!");
      }

      //Delete store account, destroy access token and redirect to signup page if successful
      setInfoMessage("Store deleted!");
      console.log("store deleted");
      window.location.reload();
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

      const response = await fetch(`/api/stores/update/${id}`, {
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
      window.location.replace(`stores/${id}`);
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
                Store Details
              </h2>
              <div className="w-75 mx-auto">
                <p>
                  <b>Store Name:</b> {storeData.store?.storeName}
                </p>
                <p>
                  <b>Store Description:</b> {storeData.store?.storeDescription}
                </p>

                <p>
                  <b>Store Image:</b>
                </p>
                <div className="thumbnail">
                  {
                    <img
                      src={`${storeData.store?.storeImage}`}
                      alt={`${storeData.store?.storeName}`}
                    />
                  }
                </div>

                <p>
                  <b>Products: </b>
                  {`${storeData.store?.products?.length}`}
                </p>
              </div>

              {infoMessage && <div className="text-center">{infoMessage}</div>}

              <div className="text-center">
                <Button
                  variant="primary"
                  className="my-2 w-50"
                  onClick={() => setShowEditForm(!showEditForm)}
                >
                  Edit Details
                </Button>
              </div>

              {showEditForm && (
                <>
                  <Container fluid>
                    <hr />
                    <div className="w-100 m-auto">
                      <h3 className="text-center">Update Store Details</h3>
                      <Form onSubmit={handleSubmit} className="mx-auto">
                        <Form.Group className="mb-3">
                          <Form.Label>Update Store Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="storeName"
                            value={
                              formInput.storeName || storeData.store?.storeName
                            }
                            placeholder={storeData.store.storeName}
                            onChange={handleChange}
                            minLength={2}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>Update Store Description</Form.Label>
                          <Form.Control
                            type="text"
                            name="storeDescription"
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
                          <Form.Label>Update Store Image</Form.Label>
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
                </>
              )}
              <div className="text-center">
                <Button
                  variant="danger"
                  className="my-2 w-50"
                  onClick={deleteStore}
                >
                  Delete Store <i className="fas fa-trash-alt"></i>
                </Button>
                Warning: Deleting your store is permanent and can't be undone.
              </div>
            </>
          )}
        </>
      </div>
    </Container>
  );
};

export default StoreInfo;
