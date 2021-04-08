import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
} from "@material-ui/core";
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
    alignItems: "center",
    backgroundColor: "#ffcaca",
    width: "60%",
    padding: theme.spacing(2),
    margin: "7px 0",
  },
  paperTrue: {
    backgroundColor: "#E7F6EA",
  },
  paperCharStep: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40%",
    padding: theme.spacing(0, 1),
    marginLeft: "14px",
    borderRadius: "18px",
    height: "50%",
    backgroundColor: "#EFF3F5",
  },
  textFieldQuestion: { width: "50%" },
  typoAnswer: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
  typoCharStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
  typoScore: {
    marginRight: "14px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  typoQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
  },
}));

export default function QuickMC({
  quiz,
  score,
  saveQuestion,
  question,
  start,
}) {
  const classes = useStyles();
  let charStep = ["A", "B", "C", "D", "E"]; //กรณี5ตัวเลือก

  const handleQuestion = (e) => {
    // setQuestion(e.target.value);
    saveQuestion(e.target.value);
  };

  return (
    <div className={classes.root}>
      <Grid container item xs={12} direction="column">
        {start ? (
          <Typography className={classes.typoStepQuestion}>
            {quiz.question}
          </Typography>
        ) : (
          <>
            <Typography className={classes.typoQuestion}>
              Add Question(Optional)
            </Typography>
            <TextField
              variant="outlined"
              label="Question"
              className={classes.textFieldQuestion}
              value={question}
              //   value={quiz.question}
              onChange={(e) => handleQuestion(e)}
            >
              {quiz.question}
            </TextField>
          </>
        )}
      </Grid>
      <Grid container item xs={12} alignItems="center"></Grid>
    </div>
  );
}
