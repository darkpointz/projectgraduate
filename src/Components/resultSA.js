import React from "react";
import { makeStyles, Typography, Grid, Paper } from "@material-ui/core";
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
  paperStudent: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#F5F7F8",
    width: "95%",
    padding: theme.spacing(1),
    margin: "7px 0",
  },
  paperTrue: {
    backgroundColor: "#E7F6EA",
  },
  typoStudent: {
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

export default function ResultSA({ student, quiz }) {
  const classes = useStyles();

  const showAnswerStudent = (item, type) => {
    let answer;
    answer = item.quizzing.find((e) => e.step === quiz.step);
    if (type === "answer") {
      return answer?.answer;
    } else if (type === "result") {
      return answer?.result;
    }
  };

  return (
    <div className={classes.root}>
      <Grid container item xs={12}>
        <Typography className={classes.typoStepQuestion}>
          {quiz.step}. {quiz.question}
        </Typography>
      </Grid>
      {student.map((item) => {
        return (
          <Grid container item xs={12} key={item.step}>
            <Grid container item xs={4}>
              <Paper className={classes.paperStudent}>
                <Typography className={classes.typoStudent}>
                  {item.fname}
                </Typography>
              </Paper>
            </Grid>
            <Grid container item xs={8}>
              <Paper
                className={clsx(classes.paperStudent, {
                  [classes.paperTrue]:
                    showAnswerStudent(item, "result") === true,
                })}
              >
                <Typography className={classes.typoStudent}>
                  {showAnswerStudent(item, "answer")}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}
