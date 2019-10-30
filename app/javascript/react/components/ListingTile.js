import React from "react";
import { Link } from "react-router-dom";

const ListingTile = props => {
  let image = props.image;

  if (!image) {
    image = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3";
  }

  return (
    <div className="columns small-12 medium-6 large-4">
      <div className="container listing-tile-info image-container">
        <Link to={`/listings/${props.id}`}>
          <img className="listing-tile-image" src={image} />
        </Link>
        <div className="bottom-centered">
          <p className="listing-tile-info">
            {props.title}, {props.postal_code}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListingTile;
