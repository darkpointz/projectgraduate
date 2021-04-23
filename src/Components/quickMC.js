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
  typoStepQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    marginBottom: "12px",
  },
  paperAnswer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F7F8",
    width: "60%",
    padding: theme.spacing(2),
    margin: "7px 0",
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
    backgroundColor: "#F5F7F8 ",
  },
  textFieldQuestion: { width: "50%", marginBottom: "12px" },
  typoAnswer: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    width: "100%",
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
    fontSize: "16px",
  },
  typoQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

export default function QuickMC({
  quiz,
  score,
  saveQuestion,
  question,
  start,
  saveAnswer,
  answerQQ,
  student,
}) {
  const classes = useStyles();
  const [answer, setanswer] = useState(answerQQ);
  let charStep = ["A", "B", "C", "D", "E"]; //กรณี5ตัวเลือก

  const handleQuestion = (e) => {
    // setQuestion(e.target.value);
    saveQuestion(e.target.value);
  };

  const handleAnswer = (e, index) => {
    let newanswer = answer;
    console.log("newanswer: ", newanswer);
    saveAnswer(e.target.value, index);
  };

  const calculatorPercent = (i) => {
    let count = 0;
    count = score[i];
    let percent = Math.round((count / student.length) * 100);
    return percent;
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
      {quiz.choice.map((item, i) => {
        return (
          <Grid container item xs={12} key={i}>
            <Grid container item xs={1} alignItems="center">
              <Paper className={classes.paperCharStep}>
                <Typography className={classes.typoCharStep}>
                  {charStep[i]}
                </Typography>
              </Paper>
            </Grid>

            <Grid container item xs={10}>
              {start ? (
                <Paper className={classes.paperAnswer}>
                  <Typography className={classes.typoAnswer}>{item}</Typography>
                  <Typography className={classes.typoScore}>
                    {/* {score[i]} */}
                    {calculatorPercent(i)}%
                  </Typography>
                </Paper>
              ) : (
                <Paper className={classes.paperAnswer}>
                  <TextField
                    className={classes.typoAnswer}
                    label="Add Answer(Optional)"
                    value={answerQQ[i]}
                    onChange={(e) => handleAnswer(e, i)}
                  >
                    {item}
                  </TextField>
                </Paper>
              )}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
