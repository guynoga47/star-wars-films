import React from "react";
import FilmsCollection from "./components/FilmsCollection";
import FilmFullContent from "./components/FilmFullContent";
import NavBar from "./components/NavBar";
import { BrowserRouter, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./Theme.js";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Route path="/" component={NavBar} />
        <Route exact path="/" component={FilmsCollection} />
        <Route path="/fullcontent" component={FilmFullContent} />
      </BrowserRouter>
    </ThemeProvider>
  );
}
