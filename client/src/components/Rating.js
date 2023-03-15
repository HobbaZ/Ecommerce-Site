function Rating(props) {
  const { rating, numberofReviews } = props;

  const getAriaLabel = () => {
    let label = `Rating: ${rating} stars out of 5`;
    if (rating < 1) {
      label = "No rating";
    } else if (rating === 1) {
      label = "1 star";
    } else {
      label = `${rating}`;
    }
    return label;
  };

  return (
    <div className="rating" aria-label={getAriaLabel()}>
      <b>Rating: </b>
      <span
        aria-label={`${rating >= 1 ? "1" : "No rating"} ${
          rating >= 0.5 ? "and a half" : ""
        } ${rating === 1 ? "star" : "stars"}`}
        aria-hidden="true"
      >
        <i
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span
        aria-label={`${rating >= 2 ? "2" : "No rating"} ${
          rating >= 1.5 ? "and a half" : ""
        } stars`}
        aria-hidden="true"
      >
        <i
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span
        aria-label={`${rating >= 3 ? "3" : "No rating"} ${
          rating >= 2.5 ? "and a half" : ""
        }  stars`}
        aria-hidden="true"
      >
        <i
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span
        aria-label={`${rating >= 4 ? "4" : "No rating"} ${
          rating >= 3.5 ? "and a half" : ""
        } stars`}
        aria-hidden="true"
      >
        <i
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <span
        aria-label={`${rating >= 5 ? "5" : "No rating"} ${
          rating >= 4.5 ? "and a half" : ""
        } stars`}
        aria-hidden="true"
      >
        <i
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        />
      </span>
      <br />
      {/*<b> {numberofReviews} Reviews</b>*/}
    </div>
  );
}
export default Rating;
