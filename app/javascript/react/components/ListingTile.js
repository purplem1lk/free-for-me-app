import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    height: 200
  },
  title: {
    fontSize: 16
  },
  media: {
    height: 140
  },
  pos: {
    marginBottom: 12
  }
});

const ListingTile = props => {
  const classes = useStyles();

  let photo = props.photo;

  if (!photo) {
    photo = "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3";
  }

  return (
    <div className="columns small-12 medium-6 large-4 foundation-div">
      <CardActionArea>
        <Link to={`/listings/${props.id}`}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={photo}
              title="Listing Tile"
            />
            <CardContent>
              <Typography className={classes.title}>{props.title}</Typography>
            </CardContent>
          </Card>
        </Link>
      </CardActionArea>
    </div>
  );
};

export default ListingTile;
