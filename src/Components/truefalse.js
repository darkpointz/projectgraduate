import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

var patternQuestion = /^[^ ]$/;

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
  btnTF: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginRight: "24px",
    color: "#ffffff",
  },
  btnTrue: {
    backgroundColor: "#12f729",
  },
  btnFalse: {
    backgroundColor: "#fc5353",
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
  const [correct, setcorrect] = useState("");
  const [question, setquestion] = useState("");

  useEffect(() => {
    setquestion(props.questionEdit);
    setcorrect(props.correctQuiz);
  }, []);

  // const handlesubmit = (e) => {
  //   e.preventDefault();
  //   const type = "truefalse";
  //   const step = props.step;
  //   const list = { step, question, type, correct };
  //   props.savequiz(list);
  // };
  const checkhandlesubmit = (e) => {
    console.log(question)
    console.log(correct)

    if(question != undefined){
      if(correct != undefined){
        e.preventDefault();
        const type = "truefalse";
        const step = props.step;
        const list = { step, question, type, correct };
        props.savequiz(list);
      }else{
        console.log("Not Choose Answer");
        var correctFailed = document.getElementById("textFailed");
        correctFailed.innerHTML = "*Please Select Answer*";
        correctFailed.style.color = "#ff0000";
      }
    }else{
      console.log("No Text In Field");
      var textFailed = document.getElementById("textFailed");
      textFailed.innerHTML = "*Please Enter Question*";
      textFailed.style.color = "#ff0000";
    }
  };
  
  const changecorrect = (e) => {
    const { value } = e.currentTarget;
    setcorrect(value);
  };

  const handlequestion = (e) => {
    setquestion(e.target.value);
  };
  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.inputbox}>
        <Typography className={classes.step}>{`${props.step}. `}</Typography>
        <TextField
          variant="outlined"
          size="small"
          value={question}
          label="Have a question to ask?"
          onChange={handlequestion}
        ></TextField>
        <span id="textFailed"></span>
      </div>
      <div className={classes.groupbtn}>
        <Button
          className={clsx(classes.btnTF, {
            [classes.btnTrue]: correct === "true",
          })}
          id="btnt"
          variant="contained"
          value="true"
          onClick={changecorrect}
        >
          True
        </Button>
        <Button
          className={clsx(classes.btnTF, {
            [classes.btnFalse]: correct === "false",
          })}
          id="btnf"
          variant="contained"
          value="false"
          onClick={changecorrect}
        >
          False
        </Button>
        <span id="correctFailed"></span>
      </div>
      <Button
        className={classes.btnsubmit}
        variant="contained"
        size="medium"
        onClick={checkhandlesubmit}
      >
        ยืนยัน
        </Button>
      <br />
    </Paper> //this.setState({ question: e.target.value } style={{backgroundColor:bgColor.color}}  onClick={onsubmit}
  );
};
export default Truefalse;
