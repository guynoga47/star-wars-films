import React, { useEffect } from "react";
import FilmsCollection from "./components/FilmsCollection";
import FilmFullContent from "./components/FilmFullContent";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme.js";

export default function App() {
  const [favFilms, setFavFilms] = React.useState(
    JSON.parse(localStorage.getItem("favFilms")) || []
  );
  const [films, setFilms] = React.useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/films")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFilms(data.results);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("favFilms", JSON.stringify(favFilms));
  }, [favFilms]);

  const favoriteBtnClickHandler = (id) => {
    let filmInd = favFilms.findIndex((fav) => fav.episode_id === id);
    const favFilmsCpy = [...favFilms];
    if (filmInd !== -1) {
      favFilmsCpy.splice(filmInd, 1);
    } else {
      let film = films.find((film) => film.episode_id === id);
      film = JSON.parse(JSON.stringify(film));
      favFilmsCpy.push(film);
    }
    setFavFilms(favFilmsCpy);
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route
          path="/"
          render={(props) => (
            <NavBar {...props} films={films} favFilms={favFilms} />
          )}
        />
        <Route
          exact
          path="/"
          render={(props) => (
            <FilmsCollection
              {...props}
              films={films}
              favFilms={favFilms}
              favoriteBtnClickHandler={favoriteBtnClickHandler}
            />
          )}
        />
        <Route path="/fullcontent" component={FilmFullContent} />
        <Route path="/" component={Footer} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
