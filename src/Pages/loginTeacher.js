import React from "react";
import { authService } from "../Auth/authService";
import { auth } from "../Auth/firebase";
import { createBrowserHistory } from "history";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
import {
  ThemeProvider,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
  AppBar,
  Grid,
} from "@material-ui/core";

export default function LoginTeacher() {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });

  const handleClicklogin = async () => {
    authService.signInWithGoogle().then((res) => {
      history.push("/launch");
    });
  };

  const logout = async () => {
    await auth
      .signOut()
      .then(() => {
        console.log("logout_sucess");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Qton
              </Typography>
              <Button
                color="inherit"
                className={classes.btn}
                onClick={() => history.push("/login/student")}
              >
                Student Login
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          container
          item
          xs={12}
          className={classes.body}
          alignItems="center"
          justify="center"
        >
          <Grid
            className={classes.paper}
            container
            item
            xs={12}
            justify="center"
          >
            <Grid
              classesName={classes.gridTypo}
              item
              xs={12}
              container
              justify="center"
            >
              <Typography variant="h2">Teacher</Typography>
            </Grid>

            <Grid container item xs={12} justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                onClick={handleClicklogin}
                className={classes.button}
              >
                LogIn with Google
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClicklogin}
                className={classes.button}
              >
                Login with Email
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
