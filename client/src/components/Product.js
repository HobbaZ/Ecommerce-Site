import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

function Product(props) {
  const { product, theme1, theme2 } = props;
  return (
    <Card
      key={product.slug}
      className={`bg-${theme1} text-${theme2} border border-${theme2}`}
    >
      <Link to={`/product/${product.slug}`}>
        <img className="card-img-top" src={product.image} alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numberofReviews={product.numberofReviews}
        />
        <Card.Text>${product.price}</Card.Text>
        <Button
          className={`bg-${theme1} text-${theme2} border border-${theme2} w-100 productButton`}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Product;
