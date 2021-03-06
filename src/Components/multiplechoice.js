import React, { useState, useEffect } from "react";
import swal from "sweetalert";
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
    if (props.choice) {
      setAnsChoice(handleSetansChoice(props.choice, props.correctQuiz));
    }
    // setAnsChoice(props.correctQuiz);
  }, []);

  const handleSetansChoice = (choice, correct) => {
    let newansChoice = [];
    choice.forEach((item) => {
      let obj = { ans: item };
      if (item.includes(correct)) {
        obj.correct = true;
      } else {
        obj.correct = false;
      }
      newansChoice.push(obj);
    });
    return newansChoice;
  };

  const handlechoice = (e, index) => {
    const { name, value } = e.target;
    const list = [...ansChoice];
    list[index][name] = value;
    setAnsChoice(list);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    // const choice = ansChoice;

    let choice = [];
    let correct = [];
    ansChoice.forEach((data) => {
      if (data.ans !== "") {
        choice.push(data.ans);
        if (data.correct) {
          correct.push(data.ans);
        }
      }
    });
    const type = "multiplechoice";
    const step = props.step;
    const active = false;
    // const list = { step, question, type, choice, active };
    const list = { step, question, type, choice, active, correct };
    if (!question) {
      swal("Error!", "Please insert question!", "error");
    } else if (correct.length === 0) {
      swal("Error!", "Please insert correct!", "error");
    } else {
      props.savequiz(list);
    }
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
                icon={<RadioButtonUnchecked fontSize="small" />}
                name="correct"
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
                // onChange={(e) => handlechoice(e, i)}
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
        ??????????????????
      </Button>
    </Paper>
  );
}
