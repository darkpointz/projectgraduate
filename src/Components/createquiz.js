import React, { useState } from "react";
import { makeStyles, TextField, Typography, Button } from "@material-ui/core";

import "../index.css";
import Multiplechoice from "./multiplechoice";
import Truefalse from "./truefalse";
import Shortanswer from "./shortanswer";
import Showquiz from "./showquiz";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  btnsavequiz: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",

    backgroundColor: "#00FF08",
  },
  layertitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
  },
  groupquestion: {},
  line: {
    display: "flex",
  },
  text: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
  },
  layeraddquiz: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  btnMC: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#FF642A",
    color: "white",
  },
  btnTF: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#786DC8",
    color: "white",
  },
  btnSA: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#E93939",
    color: "white",
  },
});
export default function Createquiz({ submit }) {
  const classes = useStyles();
  const [quizname, setquizname] = useState("");
  const [quiz, setquiz] = useState([]);
  const [step, setstep] = useState(1);
  const [selectchoice, setselectchoice] = useState(0);

  const onclicksumit = (event) => {
    event.preventDefault();
    submit(quizname, quiz);
  };

  const onClicksavequiz = (newquiz) => {
    setquiz([...quiz, newquiz]);
    setstep(step + 1);
    setselectchoice(0);
  };

  const onClickSelectchoice = (e) => {
    const { value } = e.currentTarget;
    setselectchoice(value);
  };

  return (
    <div className={classes.root}>
      <div className={classes.layertitle}>
        <TextField
          label="Quiz Title"
          value={quizname}
          variant="outlined"
          size="small"
          onChange={(e) => setquizname(e.target.value)}
        ></TextField>
        <Button
          variant="contained"
          className={classes.btnsavequiz}
          onClick={onclicksumit}
        >
          Save and Exit
        </Button>
      </div>

      {quiz.map((quiz) => (
        <Showquiz list={quiz} />
      ))}
      {selectchoice === "MC" ? (
        <Multiplechoice step={step} savequiz={onClicksavequiz} />
      ) : selectchoice === "TF" ? (
        <Truefalse step={step} savequiz={onClicksavequiz} />
      ) : selectchoice === "SA" ? (
        <Shortanswer step={step} savequiz={onClicksavequiz} />
      ) : null}

      <div className={classes.layeraddquiz}>
        <Typography className={classes.text}>Add a question</Typography>
        <br />
        <div className={classes.groupquestion}>
          <Button
            variant="contained"
            value="MC"
            onClick={onClickSelectchoice}
            className={classes.btnMC}
          >
            Multiplechoice
          </Button>
          <Button
            variant="contained"
            value="TF"
            onClick={onClickSelectchoice}
            className={classes.btnTF}
          >
            Truefalse
          </Button>
          <Button
            variant="contained"
            value="SA"
            onClick={onClickSelectchoice}
            className={classes.btnSA}
          >
            ShortAnswer
          </Button>
        </div>
      </div>
    </div>
  );
}
