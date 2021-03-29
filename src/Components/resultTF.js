import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles, Typography, Grid, Button, Paper } from "@material-ui/core";
import { teal, red } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  gridTF: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  typoStepQues: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
  },
  paperAnswer: { backgroundColor: "#19A999" },
  btnFalse: {
    backgroundColor: red[400],
    backgroundColor: "#fc5353",
  },
}));

export default function ResultTF({ quiz }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Typography className={classes.typoStepQues}>
          {quiz.step}. {quiz.question}
        </Typography>
      </Grid>

      <Grid container item xs={12}>
        <Paper className={classes.paperAnswer}>True</Paper>
      </Grid>
      <Grid container item xs={12}>
        <Paper className={classes.paperAnswer}>False</Paper>
      </Grid>
    </div>
  );
}
