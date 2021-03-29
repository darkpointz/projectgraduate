import { makeStyles, Grid, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  textField: {
    width: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  gridSA: {
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  },
}));

export default function LiveSA({
  quiz,
  saveAnswerCBS,
  quizzingStudent,
  indexQuizzing,
}) {
  const classes = useStyles();
  const [answer, setanswer] = useState();

  useEffect(() => {
    setanswer(quizzingStudent?.answer);
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setanswer(value);
    saveAnswerCBS(quiz.step, value, indexQuizzing);
  };

  return (
    <div className={classes.root}>
      <Grid container justify="center" className={classes.gridSA}>
        <TextField
          id="outlined-multiline-static"
          label="Enter Answer"
          multiline
          rows={5}
          value={answer}
          onChange={(e) => handleInputChange(e)}
          variant="outlined"
          className={classes.textField}
        />
      </Grid>
    </div>
  );
}
