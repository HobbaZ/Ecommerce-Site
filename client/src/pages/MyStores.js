import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Auth from "../utils/auth";
import Store from "../components/Store";

const StoresPage = () => {
  const [stores, setStoreData] = useState([]);

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

        document.title = `${user.name}'s Stores`;
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
      {Auth.loggedIn() && Auth.getProfile().data.isAdmin && (
        <Container fluid>
          <h2 className="text-center" tabIndex="0">
            My Stores
          </h2>
          <div className="text-center">
            <a variant="primary" href="./storecreator">
              <Button className="my-2">Create A Store</Button>
            </a>
          </div>
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
                {stores.length > 0 ? (
                  stores.map((storeInfo) => (
                    <Col key={storeInfo.store._id}>
                      <Store
                        store={storeInfo.store}
                        sm={12}
                        md={6}
                        lg={4}
                      ></Store>
                    </Col>
                  ))
                ) : (
                  <div>You don't have any stores</div>
                )}
              </Row>
            )}
          </div>
        </Container>
      )}
    </>
  );
};

export default StoresPage;
