import { makeStyles, Typography, Grid, Button, Paper } from "@material-ui/core";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { teal, red } from "@material-ui/core/colors";
import clsx from "clsx";
import { reportService } from "../Services/reportService";

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
  btnTF: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    marginRight: "18px",
    color: "#ffffff",
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      marginRight: "14px",
    },
  },
  btnTrue: {
    backgroundColor: teal[400],
    marginLeft: "0px",
  },
  btnFalse: {
    backgroundColor: red[400],
    backgroundColor: "#fc5353",
  },
}));

export default function LiveTF({
  quiz,
  saveAnswerCBS,
  quizzingStudent,
  indexQuizzing,
}) {
  const classes = useStyles();
  const [correct, setcorrect] = useState();

  useEffect(() => {
    setcorrect(quizzingStudent?.answer);
  });

  const changecorrect = (e) => {
    const { value } = e.currentTarget;
    setcorrect(value);
    saveAnswerCBS(quiz.step, value, indexQuizzing);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.gridTF}>
        <Grid container item xs={6} justify="flex-end">
          <Button
            id="btnt"
            variant="contained"
            value="true"
            onClick={changecorrect}
            className={clsx(classes.btnTF, {
              [classes.btnTrue]: correct === "true",
            })}
          >
            True
          </Button>
        </Grid>
        <Grid container item xs={6}>
          <Button
            id="btnf"
            variant="contained"
            value="false"
            onClick={changecorrect}
            className={clsx(classes.btnTF, {
              [classes.btnFalse]: correct === "false",
            })}
          >
            False
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
