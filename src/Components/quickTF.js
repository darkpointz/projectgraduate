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
  typoQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
  },
  textFieldQuestion: { width: "50%" },
  paperAnswer: {
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#F5F7F8",
    width: "50%",
    padding: theme.spacing(1),
    margin: "10px 0",
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
}));

export default function QuickTF({
  quiz,
  score,
  saveQuestion,
  question,
  start,
  student,
}) {
  const classes = useStyles();

  const handleQuestion = (e) => {
    saveQuestion(e.target.value);
  };

  const calculatorPercent = (type) => {
    let count = 0;
    if (type === "True") {
      count = score.True;
    } else {
      count = score.False;
    }
    let percent = Math.round((count / student.length) * 100);
    return percent;
  };

  return (
    <div className={classes.root}>
      <Grid container item xs={12} direction="column">
        {start ? (
          <Typography className={classes.typoQuestion}>{question}</Typography>
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
      <Grid container item xs={12} alignItems="center">
        <Paper
          className={classes.paperAnswer}
          // style={{ width: `${scoreCountCorrect}%` }}
        >
          <Typography className={classes.typoTF}>True</Typography>

          <Typography className={classes.typoScore}>
            {calculatorPercent("True")}%
          </Typography>
        </Paper>
      </Grid>
      <Grid container item xs={12} alignItems="center">
        <Paper className={classes.paperAnswer}>
          <Typography className={classes.typoTF}>False</Typography>

          <Typography className={classes.typoScore}>
            {calculatorPercent("False")}%
          </Typography>
        </Paper>
      </Grid>
    </div>
  );
}
