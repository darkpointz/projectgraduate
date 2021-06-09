import { makeStyles, Grid, Button, Typography, Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { teal } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: "70%",
    height: "85%",
    marginRight: "16px",
    marginBottom: "32px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      width: "75%",
      height: "80%",
    },
  },
  btnTrue: {
    backgroundColor: teal[400],
  },
  gridMC: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
  paperCharStep: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    padding: theme.spacing(0, 1),
    marginRight: "14px",
    borderRadius: "18px",
    height: "50%",
    backgroundColor: "#EFF3F5",
  },
  typoCharStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
}));
export default function LiveMC({
  quiz,
  saveAnswerCBS,
  quizzingStudent,
  indexQuizzing,
  type,
}) {
  const classes = useStyles();
  const [answer, setanswer] = useState("");
  const [indexAnswer, setindexAnswer] = useState();
  let charStep = ["A", "B", "C", "D", "E"]; //กรณี5ตัวเลือก

  useEffect(() => {
    setanswer(quizzingStudent?.answer);
    if (type === "CBS") {
      setindexAnswer(
        quiz?.choice.findIndex((e) => e === quizzingStudent?.answer)
      );
    }
  });

  const handleSelectAnswer = (item, index) => {
    setanswer(item);
    setindexAnswer(index);
    saveAnswerCBS(quiz.step, item, indexQuizzing, index);
  };

  const handleTypeCBS = () => {
    return (
      <>
        {quiz.choice.map((item, index) => {
          return (
            // justify="flex-end"
            <Grid container item xs={12} justify="center" key={item}>
              <Grid
                container
                item
                xs={3}
                alignItems="center"
                justify="flex-end"
              >
                <Paper className={classes.paperCharStep}>
                  <Typography className={classes.typoCharStep}>
                    {charStep[index]}
                  </Typography>
                </Paper>
              </Grid>
              <Grid container item xs={9} alignItems="center">
                <Button
                  id="btnt"
                  variant="contained"
                  value={item}
                  // value={answer}
                  onClick={() => handleSelectAnswer(item, index)}
                  className={clsx(classes.textField, {
                    // [classes.btnTrue]: item === answer,
                    [classes.btnTrue]: index === indexAnswer,
                  })}
                >
                  {item}
                </Button>
              </Grid>
            </Grid>
          );
        })}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.gridMC}>
        <Grid container item xs={12}>
          {handleTypeCBS()}
          {/* {typeDelivery === "CBT" ? handleTypeCBT() : handleTypeCBS()} */}
        </Grid>
      </Grid>
    </div>
  );
}
