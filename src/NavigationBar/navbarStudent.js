import React, { useState } from "react";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
} from "@material-ui/core";
import { createBrowserHistory } from "history";

import { Menu } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LoginByUserRoomName from "../Pages/loginByUserRoomName";
import LoginByUserName from "../Pages/loginByUserName";

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
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  typotitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "32px",
  },
}));

export default function NavbarStudent() {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });
  const [report, setreport] = useState();
  const [roomPublic, setroomPublic] = useState();

  const handleSetRoom = (roomUser, roomPublic) => {
    setreport(roomUser);
    setroomPublic(roomPublic);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={5}>
        <Grid container item xs={12}>
          <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Qton
              </Typography>
              <Button
                color="inherit"
                className={classes.btn}
                onClick={() => history.push("/login/teacher")}
              >
                Teacher Login
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Typography className={classes.typotitle}>Student Login</Typography>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          {!report ? (
            <LoginByUserRoomName handleSetRoom={handleSetRoom} />
          ) : (
            <LoginByUserName reportId={report} roomPublic={roomPublic} />
          )}
        </Grid>
      </Grid>
    </div>
  );
}
