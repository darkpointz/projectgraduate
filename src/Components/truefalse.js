import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useState } from "react";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "20px",
    marginBottom: "24px",
    backgroundColor: "#F5F5F5",
  },
  inputbox: {
    display: "flex",
    marginBottom: "24px",
  },
  step: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginRight: "14px",
  },
  groupbtn: {
    marginLeft: "24px",
    marginBottom: "24px",
  },
  btnTrue: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginRight: "24px",
  },
  btnFalse: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
  },
  btnsubmit: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginLeft: "24px",
    fontSize: "16px",
    backgroundColor: "#6be17a",
    color: "white",
  },
});

const Truefalse = (props) => {
  const classes = useStyles();
  const [quiz, setquiz] = useState({
    correct: "",
  });
  const [question, setquestion] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    const type = "truefalse";
    const correct = quiz.correct;
    const step = props.step;
    const list = { step, question, type, correct };
    props.savequiz(list);
  };
  const changecorrect = (e) => {
    const { value } = e.currentTarget;
    setquiz({ correct: value });
    if (value === "true") {
      document.getElementById("btnt").style.backgroundColor = "#00FF08";
      document.getElementById("btnf").style.backgroundColor = "";
    } else if (value === "false") {
      document.getElementById("btnt").style.backgroundColor = "";
      document.getElementById("btnf").style.backgroundColor = "#E93939";
    }
  };

  const handlequestion = (e) => {
    setquestion(e.target.value);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.inputbox}>
        <Typography className={classes.step}>{`${props.step}. `}</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={question}
          label="Have a question to ask?"
          onChange={handlequestion}
        ></TextField>
      </div>
      <div className={classes.groupbtn}>
        <Button
          className={classes.btnTrue}
          id="btnt"
          variant="contained"
          value="true"
          onClick={changecorrect}
        >
          True
        </Button>
        <Button
          className={classes.btnFalse}
          id="btnf"
          variant="contained"
          type="button"
          value="false"
          onClick={changecorrect}
        >
          False
        </Button>
      </div>
      <Button
        className={classes.btnsubmit}
        variant="contained"
        size="medium"
        onClick={handlesubmit}
      >
        ยืนยัน
      </Button>
      <br />
    </Paper> //this.setState({ question: e.target.value } style={{backgroundColor:bgColor.color}}  onClick={onsubmit}
  );
};
export default Truefalse;
