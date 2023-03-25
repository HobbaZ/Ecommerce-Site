import React, { useEffect, useState } from "react";

import { Container, Row, Col, Button } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Auth from "../utils/auth";
import Product from "../components/Product";

const ProductsPage = () => {
  const [stores, setStoreData] = useState([]);
  const [products, setProductData] = useState([]);

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

        document.title = `${user.name}'s products`;

        //get all stores
        const storeData = await Promise.all(
          user.stores.map(async (storeId) => {
            const response = await fetch(`/api/stores/${storeId}`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                authorization: `Bearer ${token}`,
              },
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch store ${storeId}`);
            }
            return response.json();
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
            My Products
          </h2>

          <div className="text-center">
            <a variant="primary" href="./productcreator">
              <Button className="my-2 w-25">Create A Product</Button>
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
                {stores.length > 0 &&
                  stores.map(
                    (store) => (
                      <p>
                        <b>Store: {store.store.storeName}</b>
                      </p>
                    ),
                    stores.products?.length > 0 ? (
                      stores.products?.map((productInfo) => (
                        <Col key={productInfo._id}>
                          <Product
                            product={productInfo}
                            sm={12}
                            md={6}
                            lg={4}
                          ></Product>
                        </Col>
                      ))
                    ) : (
                      <div>You don't have any products</div>
                    )
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

export default ProductsPage;
