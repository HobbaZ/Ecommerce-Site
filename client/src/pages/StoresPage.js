import React, { useEffect, useState } from "react";

import { Container, Row, Col } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Auth from "../utils/auth";
import Store from "../components/Store";
import StoreCreatorButton from "../components/StoreCreatorButton";

const StoresPage = () => {
  const [stores, setStoreData] = useState({});

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "My Stores";

    const getData = async () => {
      setLoading(true);
      try {
        const token = Auth.loggedIn()
          ? Auth.getToken()
          : window.location.replace("/login");

        if (!token) {
          console.log("Need to be logged in to do this");
          window.location.replace("/login");
          return false;
        }

        const response = await fetch("/api/stores");

        if (!response.ok) {
          setLoading(false);
          throw new Error(
            "something went wrong getting all store data!",
            response
          );
        }

        const storeData = await response.json();
        setStoreData(storeData);
        console.log(storeData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    getData();
  }, []);

  return (
    <>
      {Auth.loggedIn() && Auth.getProfile().data.isAdmin ? (
        <Container>
          <h2 className="text-center">My Stores</h2>
          <StoreCreatorButton isAdmin={Auth.getProfile().data.isAdmin} />
          <div className="products">
            {loading ? (
              <div className="d-flex justify-content-center">
                <Loading />
              </div>
            ) : error ? (
              <div className="text-danger d-flex justify-content-center">
                {error}
              </div>
            ) : (
              <Row>
                {stores.storeData?.length > 0 ? (
                  stores.storeData.map((store) => (
                    <Col key={store._id} sm={12} md={6} lg={6}>
                      <Store store={store}></Store>
                    </Col>
                  ))
                ) : (
                  <div>no stores</div>
                )}
              </Row>
            )}
          </div>
        </Container>
      ) : (
        window.location.replace("/login")
      )}
      ;
    </>
  );
};

export default StoresPage;
