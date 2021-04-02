import React from "react";
import { createBrowserHistory } from "history";
import { useStyles } from "./styles.js";
import { useTheme } from "./theme.js";
import {
  CssBaseline,
  Button,
  Typography,
  ThemeProvider,
  Grid,
  AppBar,
  Toolbar,
} from "@material-ui/core";

export default function Login() {
  const classes = useStyles();
  const history = createBrowserHistory({ forceRefresh: true });

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
              <Typography variant="h2">LOGIN</Typography>
              {/* classesName={classes.typoLogin} */}
            </Grid>

            <Grid container item xs={12} justify="space-evenly">
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/teacher")}
                className={classes.button}
              >
                Login Teacher
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => history.push("/login/student/room")}
                className={classes.button}
              >
                Login Student
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
