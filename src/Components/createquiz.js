import React, { useState } from "react";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

import "../index.css";
import Multiplechoice from "./multiplechoice";
import Truefalse from "./truefalse";
import Shortanswer from "./shortanswer";
import Showquiz from "./showquiz";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  layertitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  btnsavequiz: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "10px",
    backgroundColor: "#71F582",
    color: "#29710e",
    // backgroundColor: "#71F582",
  },

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
  groupquestion: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  btnMC: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#e2a073",
    color: "white",
  },
  btnTF: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#19b0b8",
    color: "white",
  },
  btnSA: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#f66a7a",
    color: "white",
  },
}));
export default function Createquiz({ submit }) {
  const classes = useStyles();
  const [quizname, setquizname] = useState("");
  const [quiz, setquiz] = useState([]);
  const [selectchoice, setselectchoice] = useState(0);

  const onclicksumit = (event) => {
    event.preventDefault();
    submit(quizname, quiz);
  };

  const onClicksavequiz = (newquiz) => {
    setquiz([...quiz, newquiz]);
    setselectchoice(0);
  };

  const onClickSelectchoice = (e) => {
    const { value } = e.currentTarget;
    setselectchoice(value);
  };

  const deleteQuiz = (step) => {
    let newQuiz = [...quiz];
    newQuiz.splice(step - 1, 1);
    newQuiz.forEach((quiz, i) => {
      quiz.step = i + 1
    })
    setquiz(newQuiz);
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
        <Box display="flex" justifyContent="flex-end" marginBottom="14px">
          <Button
            variant="contained"
            size="medium"
            className={classes.btnsavequiz}
            onClick={onclicksumit}
          >
            Save & Exit
          </Button>
        </Box>
      </div>

      {quiz.map((quiz, index) => (
        <Showquiz key={index} list={quiz} step={quiz.step} deleteQuiz={deleteQuiz} />
      ))}
      {selectchoice === "MC" ? (
        <Multiplechoice step={quiz.length + 1} savequiz={onClicksavequiz} />
      ) : selectchoice === "TF" ? (
        <Truefalse step={quiz.length + 1} savequiz={onClicksavequiz} />
      ) : selectchoice === "SA" ? (
        <Shortanswer step={quiz.length + 1} savequiz={onClicksavequiz} />
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
