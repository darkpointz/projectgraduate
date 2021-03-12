import React, { useState, useEffect } from "react";

import {
  makeStyles,
  IconButton,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { Person, People } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  paperClassic: {
    backgroundColor: "#6DC8BE",
    width: "200px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "18px",
  },
  icon: {
    color: "white",
    fontSize: "90px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      fontSize: "70px",
    },
  },
  typolabel: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
  },
}));

export default function Lanunch() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={6} container justify="center">
          <Paper className={classes.paperClassic}>
            <Person className={classes.icon} />
            <Typography className={classes.typolabel}>Classic</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paperClassic}>
            <People className={classes.icon} />
            <Typography className={classes.typolabel}>Group</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
