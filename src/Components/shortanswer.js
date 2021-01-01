import React, { useState } from "react";
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
    marginBottom: "10px",
  },
  Answer: {
    marginLeft: "24px",
  },
  deleteAnswer: {
    fontSize: "18px",
  },
  btnAddAnswer: {
    marginBottom: "10px",
  },
  btnsubmit: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    marginLeft: "24px",
  },
});
export default function Shortanswer(props) {
  const classes = useStyles();

  const [question, setquestion] = useState("");
  const [correct, setcorrect] = useState([{ ans: "" }]);

  const handlesubmit = (e) => {
    e.preventDefault();
    const type = "shortanswer";
    const step = props.step;

    const list = { step, question, type, correct };

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
      {correct.map((x, i) => {
        return (
          <div className={classes.Answer}>
            <div className={classes.eachAnswer}>
              <TextField
                variant="outlined"
                size="small"
                name="ans"
                label="Correct Answer(Optional)"
                value={x.ans}
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
            <div className={classes.btnAddAnswer}>
              {correct.length - 1 === i && correct.length <= 4 ? (
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
