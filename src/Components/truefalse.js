import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import swal from "sweetalert";
import React, { useState, useEffect } from "react";
import clsx from "clsx";

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
    backgroundColor: "#42ea5e",
    color: "white",
  },
});

const Truefalse = (props) => {
  const classes = useStyles();
  const [correct, setcorrect] = useState();
  const [question, setquestion] = useState("");

  useEffect(() => {
    setquestion(props.questionEdit);
    setcorrect(props.correctQuiz);
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const type = "truefalse";
    const step = props.step;
    const active = false;
    const list = { step, question, type, correct, active };
    if (!question) {
      swal("Error!", "Please insert question!", "error");
    } else if (!correct) {
      swal("Error!", "Please insert correct!", "error");
    } else {
      props.savequiz(list);
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
      </div>
      <Button
        className={classes.btnsubmit}
        variant="contained"
        size="medium"
        onClick={handlesubmit}
      >
        ??????????????????
      </Button>
      <br />
    </Paper> //this.setState({ question: e.target.value } style={{backgroundColor:bgColor.color}}  onClick={onsubmit}
  );
};
export default Truefalse;
