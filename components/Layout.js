import React, { useContext } from "react";
import Head from "next/head";
import NextLink from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Menu,
  Switch,
  Badge,
  Button,
  MenuItem,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import { useState } from 'react';
import { useRouter } from "next/router";

export default function Layout({ title, description, children }) {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { darkMode, favorite, userInfo } = state;
  const theme = createTheme({
    typography: {
      h1: {
        fontSize: "1.6rem",
        fontWeight: "400",
        margin: "1rem 0",
      },
      h2: {
        fontSize: "1.4rem",
        fontWeight: "400",
        margin: "1rem 0",
      },
      body1: {
        fontWeight: "normal",
      },
    },
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#f0c000",
      },
      secondary: {
        main: "#c90076",
      },
    },
  });
  const classes = useStyles();
  const darkModeChangeHandler = () => {
    dispatch({ type: darkMode ? "DARK_MODE_OFF" : "DARK_MODE_ON" });
    const newDarkMode = !darkMode;
    Cookies.set("darkMode", newDarkMode ? "ON" : "OFF");
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const loginClickHandler = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const loginMenuCloseHandler = () => {
    setAnchorEl(null);
  };
  const logoutClickHandler = () => {
    setAnchorEl(null);
    dispatch({ type: 'USER_LOGOUT' });
    Cookies.remove('userInfo');
    Cookies.remove('favoriteItems');
    router.push('/');
  };
  return (
    <div>
      <Head>
        <title>{title ? `${title} - Рецепты` : "Рецепты"}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="static" className={classes.navbar}>
          <Toolbar>
            <NextLink href="/" passHref>
              <Link>
                <Typography className={classes.brand}>
                  Давайте хорошо приготовим
                </Typography>
              </Link>
            </NextLink>
            <div className={classes.grow}></div>
            <div>
              <Switch
                checked={darkMode}
                onChange={darkModeChangeHandler}
              ></Switch>
              <NextLink href="/favorite" passHref>
                <Link>
                  {favorite.favoriteItems.length > 0 ? (
                    <Badge
                      color="secondary"
                      badgeContent={favorite.favoriteItems.length}
                    >
                      Любимые
                    </Badge>
                  ) : (
                    "Любимые"
                  )}
                </Link>
              </NextLink>
              {userInfo ? (
                <>
                  <Button 
                  aria-controls="simple-menu" 
                  aria-haspopup="true" 
                  onClick={loginClickHandler}
                   className={classes.navbarButton}
                   >
                    {userInfo.name}
                  </Button>
                  <Menu
                  id="simple-menu" 
                  anchorEl={anchorEl}
                  keepMounted 
                  open={Boolean(anchorEl)}
                  onClose={loginMenuCloseHandler}
                  >
                  <MenuItem onClick={loginMenuCloseHandler}>Профиль</MenuItem>
                  <MenuItem onClick={loginMenuCloseHandler}>Мой аккаунт</MenuItem>
                  <MenuItem onClick={logoutClickHandler}>Выйти</MenuItem>
                  </Menu>
                </>
              ) : (
                <NextLink href="/login" passHref>
                  <Link>Войти</Link>
                </NextLink>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <Container className={classes.main}>{children}</Container>
        <footer className={classes.footer}>
          <Typography>Thanks to Basir, w3schools. AVomarba | 2021</Typography>
        </footer>
      </ThemeProvider>
    </div>
  );
}
