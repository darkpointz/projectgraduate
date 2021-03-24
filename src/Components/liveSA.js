import { makeStyles, Grid, TextField } from "@material-ui/core";
import React, { useState } from "react";

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

export default function LiveSA({ quiz }) {
  const classes = useStyles();
  const [answer, setanswer] = useState();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setanswer(value);
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
