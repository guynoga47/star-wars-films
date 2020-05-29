import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "22em",
    display: "flex",
    flexDirection: "column",
    padding: "1em",
    [theme.breakpoints.down("md")]: {
      height: "18em",
    },
  },
  cardDirector: {
    marginBottom: "2em",
  },
  cardTitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0",
    width: "10em",
  },
  titleContainer: {
    justifyContent: "space-around",
    height: "4em",
  },
  divider: {
    marginLeft: "0",
    marginTop: "0",
    marginBottom: "1em",
    width: "75%",
  },
}));

const Film = (props) => {
  const classes = useStyles();
  const favoriteIcon = props.isFavorite ? (
    <FavoriteIcon fontSize="large" color="secondary" />
  ) : (
    <FavoriteBorderIcon fontSize="large" color="secondary" />
  );

  return (
    <Box boxShadow={6}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Grid container className={classes.titleContainer}>
            <Grid>
              <Typography
                className={classes.cardTitle}
                gutterBottom
                variant="h5"
              >
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                size="small"
                color="primary"
                onClick={() => props.favoriteBtnClicked(props.id)}
              >
                {favoriteIcon}
              </Button>
            </Grid>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Typography variant="subtitle1">
            RELEASE DATE: {props.release_date}
          </Typography>
          <Typography variant="subtitle1" className={classes.cardDirector}>
            DIRECTOR: {props.director.toUpperCase()}
          </Typography>
          <Typography variant="subtitle2">{props.description} </Typography>
        </CardContent>
        <Button size="small" color="primary" onClick={props.readMoreBtnClicked}>
          <MoreHorizIcon />
        </Button>
      </Card>
    </Box>
  );
};

export default Film;
