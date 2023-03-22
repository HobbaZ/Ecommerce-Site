import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Auth from "../utils/auth";
import Order from "../components/Order";

const OrdersPage = () => {
  const [orders, setOrderData] = useState({});

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

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

        document.title = `${user.name}'s orders`;
        const orderData = await Promise.all(
          user.orders.map(async (orderId) => {
            const orderResponse = await fetch(`/api/orders/${orderId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization: `Bearer ${token}`,
              },
            });
            if (!orderResponse.ok) {
              throw new Error(`Failed to fetch order ${orderId}`);
            }
            return orderResponse.json();
          })
        );

        console.log(orderData);
        setOrderData(orderData);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      {Auth.loggedIn() && (
        <Container fluid>
          <h2 className="text-center" tabIndex="0">
            My Orders
          </h2>
          <div className="products">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Loading />
              </div>
            ) : error ? (
              <div
                className="text-danger d-flex justify-content-center"
                role="alert"
              >
                {error}
              </div>
            ) : (
              <Row>
                {orders.length > 0 ? (
                  ((<h3>Orders: {orders.length}</h3>),
                  orders.map((orderInfo) => (
                    <Col key={orderInfo.order._id} sm={12} md={6} lg={4}>
                      <Order order={orderInfo.order}></Order>
                    </Col>
                  )))
                ) : (
                  <div>You don't have any orders</div>
                )}
              </Row>
            )}
          </div>
        </Container>
      )}
      ;
    </>
  );
};

export default OrdersPage;
