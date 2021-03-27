import { makeStyles, Grid, Button, Typography } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { teal } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: "40%",
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
}));
export default function LiveMC({
  quiz,
  saveAnswerCBS,
  quizzingStudent,
  indexQuizzing,
  typeDelivery,
}) {
  const classes = useStyles();
  const [answer, setanswer] = useState("");
  let charStep = ["A", "B", "C", "D", "E"]; //กรณี5ตัวเลือก

  useEffect(() => {
    setanswer(quizzingStudent?.answer);
  });

  const handleSelectAnswer = (item) => {
    setanswer(item);
    saveAnswerCBS(quiz.step, item, indexQuizzing);
  };

  const handleTypeCBS = () => {
    return (
      <>
        {quiz.choice.map((item, i) => {
          return (
            // justify="flex-end"
            <Grid container item xs={12} justify="center">
              <Typography>{charStep[i]}</Typography>
              <Button
                id="btnt"
                variant="contained"
                // name={}
                value={answer}
                // value={item}
                onClick={() => handleSelectAnswer(item)}
                // className={classes.textField}
                className={clsx(classes.textField, {
                  [classes.btnTrue]: item === answer,
                })}
              >
                {item}
                {/* {"ก.5 คำ และ ข.5 คำก.5 คำ และ ข.5 คำ5 คำ และ ข.5 คำ"} */}
              </Button>
            </Grid>
          );
        })}
      </>
    );
  };

  const handleTypeCBT = () => {
    return (
      <>
        {quiz.map((item, i) => {
          {
            console.log(item);
          }
          return (
            // <Grid container item xs={12} justify="center">
            //   <Typography>{charStep[i]}</Typography>
            //   <Button
            //     id="btnt"
            //     variant="contained"
            //     // name={}
            //     value={answer}
            //     // value={item}
            //     onClick={() => handleSelectAnswer(item)}
            //     // className={classes.textField}
            //     className={clsx(classes.textField, {
            //       [classes.btnTrue]: item === answer,
            //     })}
            //   >
            //     {item}
            //     {/* {"ก.5 คำ และ ข.5 คำก.5 คำ และ ข.5 คำ5 คำ และ ข.5 คำ"} */}
            //   </Button>
            // </Grid>
            <Button />
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