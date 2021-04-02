import React, { useState } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";
import { createBrowserHistory } from "history";
import LoginByUserRoomName from "../Pages/loginByUserRoomName";
import LoginByUserName from "../Pages/loginByUserName";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
} from "@material-ui/core";

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
                onClick={() => history.push("/login/teacher")}
              >
                Teacher Login
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
          <Grid container item xs={12} justify="center" alignItems="center" direction="column">
            {!report ? (
              <LoginByUserRoomName handleSetRoom={handleSetRoom} />
            ) : (
              <LoginByUserName reportId={report} roomPublic={roomPublic} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
