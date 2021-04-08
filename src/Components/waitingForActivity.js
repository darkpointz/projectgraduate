import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  Grid,
  Button,
  CircularProgress,
} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  content: {
    padding: theme.spacing(20, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 1),
    },
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 700,
    fontSize: "48px",
    marginTop: "30px",
  },
  typoTitleWhite: { color: "#fff" },
  progress: {
    color: "#19A999",
  },
  progressWhite: {
    color: "#fff",
  },
}));

export default function WaitingForActivity({ colorWhite }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container item xs={12} className={classes.content}>
        <Grid container item xs={12} alignItems="center" justify="center">
          <CircularProgress
            size={120}
            className={clsx(classes.progress, {
              [classes.progressWhite]: colorWhite === "true",
            })}
          />
          {/* <CircularProgress size={120} className={classes.progress} /> */}
        </Grid>
        <Grid container item xs={12} alignItems="center" justify="center">
          <Typography
            className={clsx(classes.typoTitle, {
              [classes.typoTitleWhite]: colorWhite === "true",
            })}
          >
            {/* <Typography className={classes.typoTitle}> */}
            Waiting For Activity...
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
