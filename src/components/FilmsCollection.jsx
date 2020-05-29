import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Film from "./Film";

import Spinner from "./Spinner/Spinner";

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  filmGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  collectionPageTitle: {
    letterSpacing: "5px",
    fontFamily: "Orbitron",
  },
}));

const FilmsCollection = ({
  favoriteBtnClickHandler,
  films,
  favFilms,
  setFavFilms,
  history,
}) => {
  const classes = useStyles();

  const shortenSummary = (summary, maxLen = 155) => {
    if (summary.length <= maxLen) return summary;

    const words = summary.split(" ");
    let currLen = words
      .map((el) => el.length)
      .reduce((sum, curr) => sum + curr, 0);

    while (currLen > maxLen) {
      const word = words.pop();
      currLen -= word.length;
    }

    return words.join(" ") + "...";
  };

  const readMoreBtnHandler = (id) => {
    const film = films.find((film) => film.episode_id === id);
    history.push({
      pathname: "/fullcontent",
      query: { film: film },
    });
  };

  let listOfAllfilmsToRender = <Spinner />;
  if (films.length) {
    listOfAllfilmsToRender = films.map((film) => {
      return (
        <Grid item key={film.episode_id} sm={12} md={6} lg={4}>
          <Film
            id={film.episode_id}
            title={film.title}
            director={film.director}
            release_date={film.release_date}
            description={shortenSummary(film.opening_crawl)}
            favoriteBtnClicked={() => favoriteBtnClickHandler(film.episode_id)}
            isFavorite={
              favFilms.findIndex(
                (favFilm) => favFilm.episode_id === film.episode_id
              ) !== -1
            }
            readMoreBtnClicked={() => readMoreBtnHandler(film.episode_id)}
          />
        </Grid>
      );
    });
  }

  return (
    <React.Fragment>
      {/* Main */}
      <div className={classes.heroContent}>
        <Container maxWidth="md">
          <Typography
            className={classes.collectionPageTitle}
            variant="h2"
            align="center"
            color="textPrimary"
            gutterBottom
          >
            STAR WARS FILMS
          </Typography>
        </Container>
      </div>
      <Container className={classes.filmGrid} maxWidth="lg">
        <Grid container spacing={4} lg={12}>
          {listOfAllfilmsToRender}
        </Grid>
      </Container>
      {/* End Main */}
    </React.Fragment>
  );
};

export default FilmsCollection;
