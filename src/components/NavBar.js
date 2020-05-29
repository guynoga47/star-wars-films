import React from "react";
import AppBar from "@material-ui/core/AppBar";
import logo from "../assets/starwars-logo.svg";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link as LinkRouter } from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import StarIcon from "@material-ui/icons/Star";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  favoriteBtn: {
    color: "#494949 !important",
    fontFamily: "Orbitron",
    textTransform: "uppercase",
    textDecoration: "none",
    background: "#FFE81F",
    padding: "10px",
    border: "4px solid #494949 !important",
    display: "inline-block",
    transition: "all 0.4s ease 0s",
    "&:hover": {
      color: "#FFFF !important",
      background: "#494949",
      borderColor: "#FFE81F !important",
      transition: "all 0.4s ease 0s",
    },
  },
  listItemTxt: {
    textDecoration: "none",
    color: theme.palette.primary.dark,
  },
  icon: {
    color: "#FFE81F",
  },
  menuItem: {
    backgroundColor: "#262626",
    color: "white",
    "&:hover": {
      backgroundColor: "#333333",
    },
  },
  toolbar: {
    display: "flex",
    backgroundColor: "#262626",
    justifyContent: "space-between",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    height: "6em",
  },
  appBar: {
    zIndex: "0",
  },
}));

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "#262626",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const NavBar = ({ favFilms, setFavFilms, films }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();

  const handleClick = (event) => {
    if (!favFilms.length) return;
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const listOfFavFilmsToRender = favFilms.map((film) => {
    return (
      <LinkRouter
        to={{
          pathname: "/fullcontent",
          query: { film: film },
        }}
        key={film.episode_id}
        className={classes.listItemTxt}
      >
        <MenuItem className={classes.menuItem}>
          <ListItemIcon>
            <StarIcon className={classes.icon} fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={film.title} />
        </MenuItem>
      </LinkRouter>
    );
  });

  return (
    <AppBar position="relative" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <img className={classes.logo} src={logo} alt="star wars logo" />
        <Button
          className={classes.favoriteBtn}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          onClick={handleClick}
        >
          my Favorites
        </Button>
        <StyledMenu
          className={classes.menu}
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {listOfFavFilmsToRender}
        </StyledMenu>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
