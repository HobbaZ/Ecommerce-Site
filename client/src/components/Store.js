import React, { useState } from "react";

import { Container, Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Rating from "./Rating";

const Store = ({ store }) => {
  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  //Delete store if logged in
  const deleteStore = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/stores/delete/${store._id}`, {
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
      window.location.replace("/mystores");
    } catch (err) {
      console.error(err);
    }
  };

  function editStore() {
    window.location.replace(`/stores/${store._id}`);
  }

  return (
    <Container fluid>
      <Card key={store._id} className={`m-1 p-2`}>
        <Link to={`/stores/${store._id}`}>
          <img
            className="card-img-top"
            src={store.storeImage}
            alt={store.storeName}
          />
        </Link>
        <Card.Body>
          <Link to={`/stores/${store._id}`} store={store}>
            <Card.Title>{store.storeName}</Card.Title>
          </Link>

          {/*link to store*/}
          <Card.Subtitle>{store.storeDescription}</Card.Subtitle>
          <Rating rating={store.storeRating} />

          <Card.Text>Products: {store.products?.length}</Card.Text>

          <div className="text-center">
            <Button type="button" className="my-2 w-100" onClick={editStore}>
              Edit Store <i className="fas fa-pen"></i>
            </Button>
          </div>

          <div className="text-center">
            <Button
              variant="danger"
              type="button"
              className="my-2 w-100"
              onClick={deleteStore}
            >
              Delete Store <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Store;
