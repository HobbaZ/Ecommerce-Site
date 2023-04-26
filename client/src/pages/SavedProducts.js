import { useContext, useState, useEffect } from "react";
import { Button, Card, Badge, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import Rating from "../components/Rating";

import { ThemeContext } from "../Theme";

const SavedProducts = () => {
  const { theme } = useContext(ThemeContext);

  document.title = "Your Saved Products";

  // state for messages
  const [infoMessage, setInfoMessage] = useState("");

  //loading state
  const [loading, setLoading] = useState(false);

  // state for messages
  const [error, setError] = useState("");

  const [savedProducts, setSavedProducts] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const products =
          JSON.parse(localStorage.getItem("savedProducts")) || [];
        setSavedProducts(products);
      } catch (err) {
        console.error(err);
        return [];
      }
    };
    getData();
  }, []);

  //Delete product if logged in
  const deleteSavedProduct = async (product) => {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      if (!token) {
        console.log("Need to be logged in to do this");
        window.location.replace("/login");
        return false;
      }

      const savedProducts =
        JSON.parse(localStorage.getItem("savedProducts")) || [];

      // Find the index of the product to be removed
      const index = savedProducts.findIndex(
        (productToRemove) => productToRemove._id === product._id
      );

      // Remove the product from the array using splice method
      if (index !== -1) {
        savedProducts.splice(index, 1);
      }

      localStorage.setItem("savedProducts", JSON.stringify(savedProducts));

      console.log("Product removed successfully!");
      setSavedProducts(savedProducts);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-center" tabIndex="0">
        Your Saved Products
      </h1>

      {savedProducts.length === 0 ? (
        <div className="text-center">You havn't saved any products yet.</div>
      ) : (
        <Row>
          {savedProducts.map((item) => (
            <Col key={item._id} sm={6} md={4} lg={3}>
              <Card key={item._id}>
                <img
                  className="card-img-top"
                  src={item.image}
                  alt={item.name}
                />

                <Card.Body>
                  <Link to={`/products/${item._id}`}>
                    <Card.Title>{item.name}</Card.Title>
                  </Link>

                  {/*link to store*/}
                  <Link to={`/stores/${item.store}`}>
                    <Card.Subtitle>Go to store</Card.Subtitle>
                  </Link>
                  <Rating
                    rating={item.rating}
                    numberofReviews={item.numberofReviews}
                  />

                  <Card.Text>
                    <b>Stock: </b>
                    <span>
                      {item.numberinStock > 0 ? (
                        <Badge bg="success">
                          {item.numberinStock} Available
                        </Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </span>
                  </Card.Text>

                  <Card.Text>
                    <b>Price:</b> ${item.price}
                  </Card.Text>
                  <div className="text-center">
                    <Button
                      variant="primary"
                      type="button"
                      className="my-2 w-100"
                    >
                      Add to Cart
                    </Button>
                  </div>

                  <div className="text-center">
                    <Button
                      variant="danger"
                      type="button"
                      className="my-2 w-100"
                      onClick={() => deleteSavedProduct(item)}
                    >
                      Delete Saved Product <i className="fas fa-trash-alt"></i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default SavedProducts;
