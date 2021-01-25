import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Checkbox,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import { CheckCircle, RadioButtonUnchecked } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: "20px",
    marginBottom: "24px",
    backgroundColor: "#F5F5F5",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "14px",
    },
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
  eachAnswer: {
    display: "flex",
    marginBottom: "10px",
  },
  Answer: {
    marginLeft: "24px",
  },
  checkbox: {
    "&$checked": {
      color: "#6be17a",
    },
  },
  boxAddAnswer: {
    marginBottom: "10px",
  },
  btnaddAnswer: {
    fontFamily: "'Prompt', sans-serif",
    backgroundColor: "#2196f3",
    color: "white",
  },
  btnsubmit: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginLeft: "24px",
    fontSize: "16px",
    backgroundColor: "#42ea5e",
    color: "white",
  },
  deleteAnswer: {
    fontSize: "18px",
  },
}));

export default function Multiplechoice(props) {
  const classes = useStyles();

  const [ansChoice, setAnsChoice] = useState([
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
  ]);
  const [question, setquestion] = useState("");

  useEffect(() => {
    setquestion(props.questionEdit);
    setAnsChoice(props.correctQuiz);
  }, []);

  const handlechoice = (e, index) => {
    const { name, value } = e.target;
    const list = [...ansChoice];
    list[index][name] = value;
    setAnsChoice(list);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const choice = ansChoice;
    const type = "multiplechoice";
    const step = props.step;
    const list = { step, question, type, choice };
    props.savequiz(list);
  };

  const handleDeletefield = (index) => {
    const list = [...ansChoice];
    list.splice(index, 1);
    setAnsChoice(list);
  };

  const handleAddClick = () => {
    setAnsChoice([...ansChoice, { ans: "" }]);
  };

  const handleQuestion = (e) => {
    setquestion(e.target.value);
  };

  const handleCheckbox = (e, index) => {
    const { name, checked } = e.target;
    const list = [...ansChoice];

    list[index][name] = checked;
    setAnsChoice(list);
  };

  return (
    <Paper className={classes.root} elevation={3}>
      <div className={classes.inputbox}>
        <Typography className={classes.step}>{`${props.step}. `}</Typography>
        <TextField
          variant="outlined"
          required={true}
          size="small"
          type="text"
          name="question"
          label="Have a question to ask?"
          value={question}
          onChange={handleQuestion}
        ></TextField>
      </div>
      {ansChoice.map((x, i) => {
        return (
          <div className={classes.Answer}>
            <div className={classes.eachAnswer}>
              <Checkbox
                // icon={<CheckCircleOutline fontSize="small" />}
                icon={<RadioButtonUnchecked fontSize="small" />}
                name="correct"
                // className={classes.checkbox}
                style={{ color: "#6be17a" }}
                checked={x.correct}
                checkedIcon={<CheckCircle />}
                onChange={(e) => handleCheckbox(e, i)}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
              <TextField
                variant="outlined"
                size="small"
                name="ans"
                label={`Answer ${i + 1}`}
                value={x.ans}
                onChange={(e) => handlechoice(e, i)}
              />

              {ansChoice.length !== 2 && (
                <Button
                  className={classes.deleteAnswer}
                  onClick={() => handleDeletefield(i)}
                >
                  X
                </Button>
              )}
            </div>
            <div className={classes.boxAddAnswer}>
              {ansChoice.length - 1 === i && ansChoice.length <= 4 ? (
                <Button
                  variant="contained"
                  className={classes.btnaddAnswer}
                  size="small"
                  onClick={handleAddClick}
                >
                  ADD ANSWER
                </Button>
              ) : null}
            </div>
          </div>
        );
      })}
      <Button
        className={classes.btnsubmit}
        variant="contained"
        size="medium"
        onClick={handlesubmit}
      >
        ยืนยัน
      </Button>
    </Paper>
  );
}
