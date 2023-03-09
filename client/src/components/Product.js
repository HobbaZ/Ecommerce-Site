import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product({ product }) {
  return (
    <Card key={product._id}>
      <Link to={`/products/${product._id}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>

        {/*link to store*/}
        <Card.Subtitle>{product.store}</Card.Subtitle>
        <Rating
          rating={product.rating}
          numberofReviews={product.numberofReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
