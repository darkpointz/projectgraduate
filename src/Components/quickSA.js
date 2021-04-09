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
  typoQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
  },
  textFieldQuestion: { width: "50%" },
  typoStudent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  paperStudent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F5F7F8",
    width: "95%",
    padding: theme.spacing(1),
    margin: "7px 0",
  },
  typoScore: {
    marginRight: "14px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
}));
export default function QuickSA({
  quiz,
  student,
  saveQuestion,
  question,
  start,
}) {
  const classes = useStyles();

  const handleQuestion = (e) => {
    saveQuestion(e.target.value);
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
      {student.map((item, i) => {
        return (
          <Grid container item xs={12}>
            <Grid container item xs={4}>
              <Paper className={classes.paperStudent}>
                <Typography className={classes.typoStudent}>
                  {item.fname}
                </Typography>
              </Paper>
            </Grid>
            <Grid container item xs={8}>
              <Paper className={classes.paperStudent}>
                <Typography className={classes.typoStudent}>
                  {item.quizzing[0]?.answer}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
