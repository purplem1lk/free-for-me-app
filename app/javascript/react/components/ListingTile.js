import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import * as moment from "moment";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: 200
  },
  cardHeader: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  },
  media: {
    height: "100%"
  }
});

const ListingTile = props => {
  const classes = useStyles();

  let photo = props.photo;

  if (!photo) {
    photo = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3";
  }

  const formatDate = inputDate => {
    return moment(inputDate).format("MMM Do YYYY");
  };

  return (
    <div className="columns small-12 medium-6 large-4 foundation-div">
      <CardActionArea>
        <Link to={`/listings/${props.id}`}>
          <Card className={classes.card} elevation={4}>
            <CardHeader
              className={classes.cardHeader}
              title={props.title}
              subheader={formatDate(props.createdAt)}
            ></CardHeader>
            <CardMedia
              className={classes.media}
              image={photo}
              title="Listing Tile"
            />
          </Card>
        </Link>
      </CardActionArea>
    </div>
  );
};

export default ListingTile;
