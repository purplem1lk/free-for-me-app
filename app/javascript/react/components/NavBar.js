import React, { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import { ChatkitProvider, TokenProvider } from "@pusher/chatkit-client-react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AppBar from "@material-ui/core/AppBar";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import SearchIcon from "@material-ui/icons/Search";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Functions from "../utils/Functions";
import MessagesButton from "./MessagesButton";
import SelectLanguageButton from "./SelectLanguageButton"

const instanceLocator = "v1:us1:ac944341-a321-4e72-968c-e2e07aca10ac";
const tokenProvider = new TokenProvider({
  url:
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/ac944341-a321-4e72-968c-e2e07aca10ac/token"
});

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.2),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.4)
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "#000000"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  whiteText: {
    color: "white",
    "&:hover": {
      color: "white",
      textDecoration: "none"
    }
  },
  marginRight: {
    marginRight: "2px"
  }
}));

const NavBar = props => {
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    const payload = {
      authenticity_token: Functions.getMetaContent("csrf-token")
    };

    fetch("/users/sign_out.json", {
      method: "DELETE",
      body: JSON.stringify(payload),
      headers: {
        Accepts: "application/json",
        "Content-Type": "application/jsonß"
      }
    }).then(response => {
      history.push("/listings");
      location.reload();
    });
  };

  const menuId = "primary-search-account-menu";
  const renderUserMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My Listings</MenuItem>
      <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
    </Menu>
  );

  let rightHandContent = "";
  // userId cannot be null in ChatkitProvider. can ONLY render this when we have a userId
  if (props.isSignedIn && props.userId) {
    rightHandContent = (
      <div className={classes.sectionDesktop}>
        <ChatkitProvider
          instanceLocator={instanceLocator}
          tokenProvider={tokenProvider}
          userId={props.userId}
        >
          <MessagesButton userId={props.userId} />
        </ChatkitProvider>
        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
      </div>
    );
  } else {
    rightHandContent = (
      <div>
        <Button href="/login" className={classes.whiteText}>
          Log in
        </Button>
        <Button href="/signup" className={classes.whiteText}>
          Sign up
        </Button>
      </div>
    );
  }

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.whiteText}>
              Free For Me
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              type="text"
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <div className={classes.grow} />
          <SelectLanguageButton/>

          <IconButton
            className={classes.marginRight}
            edge="end"
            aria-label="toggle light or dark mode"
            onClick={props.toggleIsLightMode}
            color="inherit"
          >
            <Brightness4Icon />
          </IconButton>
          {rightHandContent}
        </Toolbar>
      </AppBar>
      {renderUserMenu}
    </div>
  );
};

export default NavBar;
