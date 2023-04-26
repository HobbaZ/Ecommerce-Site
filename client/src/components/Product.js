import { Button, Card, Badge, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Auth from "../utils/auth";

function Product({ product }) {
  function addToSavedProducts() {
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

      if (
        savedProducts.find((productToSave) => productToSave._id === product._id)
      ) {
        console.log("Product already saved!");
        return;
      }

      savedProducts.push(product);

      localStorage.setItem("savedProducts", JSON.stringify(savedProducts));

      console.log("Product saved successfully!");
    } catch (err) {
      console.error(err);
    }
  }

  function addToCartHandler() {
    try {
      const token = Auth.loggedIn()
        ? Auth.getToken()
        : window.location.replace("/login");

      if (!token) {
        console.log("Need to be logged in to do this");
        window.location.replace("/login");
        return false;
      }

      const cartProducts =
        JSON.parse(localStorage.getItem("cartProducts")) || [];

      if (
        cartProducts.find((productToSave) => productToSave._id === product._id)
      ) {
        console.log("Product already added to cart!");
        return;
      }

      cartProducts.push(product);

      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));

      console.log("Product added to cart");
    } catch (err) {
      console.error(err);
    }
  }

  //check if product already favourited
  const savedProducts = JSON.parse(localStorage.getItem("savedProducts")) || [];
  const alreadySaved = savedProducts.find(
    (productToSave) => productToSave._id === product._id
  );

  return (
    <Card key={product._id} className="h-100 bg-transparent">
      {Auth.loggedIn() && !alreadySaved ? (
        <button
          className="saveProductButton"
          type="button"
          onClick={addToSavedProducts}
          title="add to saved products"
        >
          <i className="fas fa-heart"></i>
        </button>
      ) : (
        <button
          className="saveProductButton"
          type="button"
          onClick={addToSavedProducts}
          title="add to saved products"
        >
          <i className="fas fa-heart text-danger"></i>
        </button>
      )}

      <Card.Header>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
      </Card.Header>

      <Card.Body>
        <img className="card-img-top" src={product.image} alt={product.name} />

        {/*link to store*/}
        <Link to={`/stores/${product.store}`}>
          <Card.Subtitle>Go to store</Card.Subtitle>
        </Link>

        <Rating
          rating={product.rating}
          numberofReviews={product.numberofReviews}
        />

        <Card.Text>
          <b>Description: </b> {product.description}
        </Card.Text>

        <Card.Text>
          <b>Stock: </b>
          <span>
            {product.numberinStock > 0 ? (
              <Badge bg="success">{product.numberinStock} Available</Badge>
            ) : (
              <Badge bg="danger">Unavailable</Badge>
            )}
          </span>
        </Card.Text>

        <Card.Text>
          <b>Price:</b> ${product.price}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button className="w-100" onClick={addToCartHandler}>
          Add to Cart
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default Product;
