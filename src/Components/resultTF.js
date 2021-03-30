import React, { useState } from "react";
import { makeStyles, Typography, Grid, Button, Paper } from "@material-ui/core";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
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
  typoStepQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
  },
  paperAnswer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#ffcaca",
    width: "50%",
    padding: theme.spacing(1),
    margin: "10px 0",
  },
  paperTrue: {
    backgroundColor: "#E7F6EA",
  },
  typoTF: {
    marginLeft: "14px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  typoScore: {
    marginRight: "14px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  iconCheck: {
    color: "#5dbe6e",
    marginRight: "14px",
  },
}));

export default function ResultTF({
  quiz,
  scoreCountCorrect,
  scoreCountFail,
  correct,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Typography className={classes.typoStepQuestion}>
          {quiz.step}. {quiz.question}
        </Typography>
      </Grid>

      <Grid container item xs={12} alignItems="center">
        {quiz.correct === "true" ? (
          <CheckCircleRoundedIcon className={classes.iconCheck} />
        ) : (
          <div
            style={{
              marginRight: "38px",
            }}
          />
        )}
        <Paper
          className={clsx(classes.paperAnswer, {
            [classes.paperTrue]: quiz.correct === "true",
          })}
          // style={{ width: `${scoreCountCorrect}%` }}
        >
          <Typography className={classes.typoTF}>True</Typography>
          {quiz.correct === "true" ? (
            <Typography className={classes.typoScore}>
              {scoreCountCorrect}%
            </Typography>
          ) : (
            <Typography className={classes.typoScore}>
              {scoreCountFail}%
            </Typography>
          )}
        </Paper>
      </Grid>
      <Grid container item xs={12} alignItems="center">
        {quiz.correct === "false" ? (
          <CheckCircleRoundedIcon className={classes.iconCheck} />
        ) : (
          <div
            style={{
              marginRight: "38px",
            }}
          />
        )}
        <Paper
          className={clsx(classes.paperAnswer, {
            [classes.paperTrue]: quiz.correct === "false",
          })}
        >
          <Typography className={classes.typoTF}>False</Typography>
          {quiz.correct === "false" ? (
            <Typography className={classes.typoScore}>
              {scoreCountCorrect}%
            </Typography>
          ) : (
            <Typography className={classes.typoScore}>
              {scoreCountFail}%
            </Typography>
          )}
        </Paper>
      </Grid>
    </div>
  );
}
