import React, { useEffect, useState, useContext } from "react";

import { Container, Button } from "react-bootstrap";
import { Loading } from "../components/Loading";
import Auth from "../utils/auth";
import ProductInfo from "../components/ProductInfo";
import { ThemeContext } from "../Theme";

const ProductsPage = () => {
  const { theme } = useContext(ThemeContext);

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
    <Container fluid>
      {Auth.loggedIn() && Auth.getProfile().data.isAdmin && (
        <Container fluid>
          <h2 className="text-center" tabIndex="0">
            My Products
          </h2>

          <div className="text-center">
            <a variant="primary" href="./productcreator">
              <Button className="my-2" disabled={!stores.length > 0}>
                Create A Product
              </Button>
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
              <div>
                {stores.length > 0 ? (
                  stores.map((store) => (
                    <>
                      <div>
                        <b>
                          {store.store.storeName} -
                          {store.store.products?.length > 1
                            ? `   ${store.store.products.length} Products`
                            : store.store.products?.length === 1
                            ? `   ${store.store.products.length} Product`
                            : "   You don't have any products"}
                        </b>
                      </div>

                      {store.store.products?.length > 0 && (
                        <div className="productTable">
                          <table className={`table table-${theme} `}>
                            <thead>
                              <tr className={`background ${theme}`}>
                                <th scope="col">Images</th>
                                <th scope="col">Name</th>
                                <th scope="col">Category</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Reviews</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                              </tr>
                            </thead>

                            <tbody className="">
                              {store.store.products?.length > 0 && (
                                <>
                                  {store.store.products?.map((products) => (
                                    <>
                                      <tr
                                        key={products}
                                        className={`background ${theme}`}
                                      >
                                        <ProductInfo
                                          productInfo={products}
                                        ></ProductInfo>
                                      </tr>
                                    </>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </>
                  ))
                ) : (
                  <p className="text-danger text-center">
                    Need to create a store first before you can create products
                  </p>
                )}
              </div>
            )}
          </div>
        </Container>
      )}
    </Container>
  );
};

export default ProductsPage;
