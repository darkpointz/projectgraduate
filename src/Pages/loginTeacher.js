import React, { useState, useContext } from "react";
import axios from "axios";
import { authService } from "../Auth/authService";
import { auth, provider } from "../Auth/firebase";
import { createBrowserHistory } from "history";
import {
  makeStyles,
  CssBaseline,
  Button,
  Toolbar,
  Typography,
  AppBar,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  appBar: {
    backgroundColor: "#19A999",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "34px",
  },
  btn: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
  },
  typotitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
  },
}));

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
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="sticky" className={classes.appBar}>
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
      <Button variant="contained" onClick={handleClicklogin}>
        Google Signin Teacher
      </Button>
      <Button variant="contained" onClick={handleClicklogin}>
        Signin Teacher
      </Button>
    </div>
  );
}
