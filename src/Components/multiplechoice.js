import React, { useState } from "react";
import {
  makeStyles,
  Checkbox,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";
import {
  ClearIconm,
  CheckCircle,
  CheckCircleOutline,
} from "@material-ui/icons";

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
  eachAnswer: {
    marginBottom: "10px",
  },
  Answer: {
    marginLeft: "24px",
  },
  btnsubmit: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginLeft: "24px",
  },
  deleteAnswer: {
    fontSize: "18px",
  },
});

export default function Multiplechoice(props) {
  const classes = useStyles();

  const [arrAnsChoice, setarrAnsChoice] = useState([
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
    { ans: "", correct: false },
  ]);
  const [question, setquestion] = useState("");

  const handlechoice = (e, index) => {
    const { name, value } = e.target;
    const list = [...arrAnsChoice];
    list[index][name] = value;
    setarrAnsChoice(list);
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    const choice = arrAnsChoice;
    const type = "multiplechoice";
    const step = props.step;
    const list = { step, question, type, choice };
    props.savequiz(list);
  };

  const handleDeletefield = (index) => {
    const list = [...arrAnsChoice];
    list.splice(index, 1);
    setarrAnsChoice(list);
  };

  const handleAddClick = () => {
    setarrAnsChoice([...arrAnsChoice, { ans: "" }]);
  };

  const handleQuestion = (e) => {
    setquestion(e.target.value);
  };

  const handleCheckbox = (e, index) => {
    const { name, checked } = e.target;
    const list = [...arrAnsChoice];

    list[index][name] = checked;
    setarrAnsChoice(list);
  };

  return (
    <div>
      <Paper className={classes.root}>
        <div className={classes.inputbox}>
          <Typography className={classes.step}>{`${props.step}. `}</Typography>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            name="question"
            label="Have a question to ask?"
            value={question}
            onChange={handleQuestion}
          ></TextField>
        </div>
        {arrAnsChoice.map((x, i) => {
          return (
            <div className={classes.Answer}>
              <div className={classes.eachAnswer}>
                <Checkbox
                  icon={<CheckCircleOutline fontSize="small" />}
                  name="correct"
                  style={{
                    color: "#00FF08",
                  }}
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

                {arrAnsChoice.length !== 2 && (
                  <Button
                    className={classes.deleteAnswer}
                    onClick={() => handleDeletefield(i)}
                  >
                    X
                  </Button>
                )}
              </div>
              <div className="btn-box">
                {arrAnsChoice.length - 1 === i && arrAnsChoice.length <= 4 ? (
                  <Button
                    variant="contained"
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
        <br />
        <Button
          className={classes.btnsubmit}
          variant="contained"
          size="small"
          onClick={handlesubmit}
        >
          ยืนยัน
        </Button>
      </Paper>
    </div>
  );
}
