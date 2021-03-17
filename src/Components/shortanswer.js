import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  TextField,
  Button,
  Paper,
} from "@material-ui/core";

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
    display: "flex",
    marginBottom: "10px",
  },
  Answer: {
    marginLeft: "24px",
  },
  deleteAnswer: {
    fontSize: "18px",
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
});
export default function Shortanswer(props) {
  const classes = useStyles();

  const [question, setquestion] = useState("");
  const [correct, setcorrect] = useState([{ ans: "" }]);

  useEffect(() => {
    setquestion(props.questionEdit);
    setcorrect(props.correctQuiz);
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();
    const type = "shortanswer";
    const step = props.step;
    const active = false;
    const list = { step, question, type, correct, active };
    props.savequiz(list);
  };

  const handlequestion = (e) => {
    setquestion(e.target.value);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...correct];
    list[index][name] = value;
    setcorrect([...list]);
  };
  const handleRemoveClick = (index) => {
    const list = [...correct];
    list.splice(index, 1);
    setcorrect([...list]);
  };

  const handleAddClick = () => {
    setcorrect([...correct, { ans: "" }]);
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
      {correct.map((item, i) => {
        return (
          <div className={classes.Answer}>
            <div className={classes.eachAnswer}>
              <TextField
                variant="outlined"
                size="small"
                name="ans"
                label="Correct Answer(Optional)"
                value={item.ans}
                onChange={(e) => handleInputChange(e, i)}
              />
              {correct.length !== 1 && (
                <Button
                  className={classes.deleteAnswer}
                  onClick={() => handleRemoveClick(i)}
                >
                  X
                </Button>
              )}
            </div>
            <div className={classes.boxAddAnswer}>
              {correct.length - 1 === i && correct.length <= 10 ? (
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
        size="small"
        onClick={handlesubmit}
      >
        ยืนยัน
      </Button>
    </Paper>
  );
}
