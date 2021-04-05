import React from "react";
import { makeStyles, Typography, Grid, Button, Paper } from "@material-ui/core";
import CheckRoundedIcon from "@material-ui/icons/CheckRounded";
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
  paperCharStepTrue: {
    backgroundColor: "#5DBE6E",
    height: "50%",
    width: "70%",
    color: "#fff",
  },
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
  iconCheck: {
    color: "#fff",
    marginRight: "8px",
    fontSize: "24px",
  },
}));

export default function ResultMC({
  quiz,
  scoreCountCorrect,
  scoreCountFail,
  studentMax,
  score,
  studentAnswer,
}) {
  const classes = useStyles();
  let charStep = ["A", "B", "C", "D", "E"]; //กรณี5ตัวเลือก

  const checkCorrect = (item) => {
    let truefalse;
    truefalse = quiz.correct.includes(item);
    return truefalse;
  };

  const calculatorPercent = (item) => {
    let ans = [];
    studentAnswer.find((e) => {
      if (e === item) {
        ans.push(e);
      }
    });
    let percent = Math.round((ans.length / studentMax) * 100);
    return percent;
  };

  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Typography className={classes.typoStepQuestion}>
          {quiz.step}. {quiz.question}
        </Typography>
      </Grid>

      {quiz.choice.map((item, i) => {
        return (
          <Grid container item xs={12} key={i}>
            <Grid container item xs={1} alignItems="center" justify="center">
              <Paper
                className={clsx(classes.paperCharStep, {
                  [classes.paperCharStepTrue]: checkCorrect(item) === true,
                })}
              >
                {checkCorrect(item) === true ? (
                  <CheckRoundedIcon className={classes.iconCheck} />
                ) : null}
                <Typography className={classes.typoCharStep}>
                  {charStep[i]}
                </Typography>
              </Paper>
            </Grid>

            <Grid container item xs={10}>
              <Paper
                className={clsx(classes.paperAnswer, {
                  [classes.paperTrue]: checkCorrect(item) === true,
                })}
              >
                <Typography className={classes.typoAnswer}>{item}</Typography>
                <Typography className={classes.typoAnswer}>
                  {calculatorPercent(item)}%
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
