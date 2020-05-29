import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Spinner from "./Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  title: {
    fontWeight: "500",
    fontSize: "18px",
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "16px",
  },
}));

const FilmFullContent = (props) => {
  const [characters, setCharacters] = React.useState([]);
  const classes = useStyles();

  const film = props.location.query
    ? props.location.query.film
    : JSON.parse(localStorage.getItem("film"));

  React.useEffect(() => {
    if (props.location.query) {
      localStorage.setItem("film", JSON.stringify(props.location.query.film));
    }
    let characters = film.characters;
    Promise.all(
      characters.map((character) =>
        fetch(character)
          .then((response) => response.json())
          .then((data) => data.name)
          .catch((logError) => console.log(logError))
      )
    ).then((data) => {
      data = data.slice(0, 3);
      data = data.join(", ") + "...";
      setCharacters(data);
    });
  }, []);

  let contentToRender = <Spinner />;
  if (characters.length) {
    contentToRender = (
      <div>
        <Card className={classes.card}>
          <CardContent>
            <Typography className={classes.title} variant="subtitle1">
              Title: <span className={classes.subtitle}>{film.title}</span>
            </Typography>
            <Typography className={classes.title} variant="subtitle1">
              Release Date:{" "}
              <span className={classes.subtitle}>{film.release_date}</span>
            </Typography>
            <Typography className={classes.title} variant="subtitle1">
              Director:{" "}
              <span className={classes.subtitle}>{film.director}</span>
            </Typography>
            <Typography className={classes.title} variant="subtitle1">
              Producer:{" "}
              <span className={classes.subtitle}>{film.producer}</span>
            </Typography>
            <Typography className={classes.title} variant="subtitle1">
              Characters: <span className={classes.subtitle}>{characters}</span>
            </Typography>
            <Typography className={classes.title} variant="subtitle1">
              Summary:
            </Typography>
            <br></br>
            <Typography variant="subtitle1">{film.opening_crawl} </Typography>
          </CardContent>
        </Card>
        <Button onClick={() => props.history.goBack()}>
          <ArrowBackIcon />
          Back
        </Button>
      </div>
    );
  }

  return <React.Fragment>{contentToRender}</React.Fragment>;
};

export default FilmFullContent;
