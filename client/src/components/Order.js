import React, { useState } from "react";

import { Container, Button, Card } from "react-bootstrap";

import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Order = ({ order }) => {
  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  //Delete order if logged in
  const deleteorder = async () => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      const response = await fetch(`/api/orders/delete/${order._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("something went wrong with deleting order!");
      }

      //Delete order account, destroy access token and redirect to signup page if successful
      setInfoMessage("order deleted!");
      console.log("order deleted");
      window.location.replace("/myorders");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid>
      <Card key={order._id} className={`m-1 p-2`}>
        <Card.Body>
          <Link to={`/orders/${order._id}`} order={order}>
            <Card.Title>{order.orderName}</Card.Title>
          </Link>

          {/*link to order*/}
          <Card.Subtitle>{order.orderDescription}</Card.Subtitle>

          <Card.Text>Orders: {order.orders?.length}</Card.Text>

          <div className="text-center">
            <Button
              variant="danger"
              type="button"
              className="my-2 w-75"
              onClick={deleteorder}
            >
              Delete {order.orderName} <i className="fas fa-trash-alt"></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Order;
