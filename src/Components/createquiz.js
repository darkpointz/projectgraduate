import React, { useState, useEffect } from "react";
import { quizService } from "../Services/quizService";
import { useHistory, useParams } from "react-router-dom";

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
import swal from "sweetalert";

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
    backgroundColor: "#42ea5e",
    color: "#ffffff",
  },

  line: {
    display: "flex",
  },
  text: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    marginBottom: "14px",
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
export default function Createquiz(props) {
  let history = useHistory();
  let params = useParams();
  const classes = useStyles();
  const [quizname, setquizname] = useState("Untitled Quiz");
  const [quiz, setquiz] = useState([]);
  const [selectchoice, setselectchoice] = useState(0);
  const [editQuiz, seteditQuiz] = useState(false);

  useEffect(() => {
    if (params.quizId != 0) {
      quizService.getQuizByQuizId(params.quizId).then((res) => {
        console.log(res);
        setquiz(res.quiz);
        setquizname(res.quizName);
        seteditQuiz(true);
      });
    }
  }, []);

  const onclicksumit = (event) => {
    event.preventDefault();
    const formquiz = {
      quizName: quizname,
      quiz: quiz,
      path: "Quizzes",
    };
    const uId = localStorage.getItem("userId");
    if (editQuiz) {
      quizService.editQuiz(formquiz, params.quizId, uId).then((res) => {
        swal("Success!", "Edit Quiz Success!", "success");
        history.push("/quiz");
      });
    } else {
      quizService.insertQuiz(formquiz, uId).then((res) => {
        swal("Success!", "Create Quiz Success!", "success");
        history.push("/quiz");
      });
    }
    // submit(quizname, quiz);
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
      quiz.step = i + 1;
    });
    setquiz(newQuiz);
  };

  const savequizEdit = (newquiz, index) => {
    let Quiz = [...quiz];
    Quiz[index] = newquiz;
    console.log(index);
    setquiz(Quiz);
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
      {quiz.map((quiz, index) => {
        return (
          <Showquiz
            key={index}
            list={quiz}
            step={quiz.step}
            deleteQuiz={deleteQuiz}
            savequiz={savequizEdit}
          />
        );
      })}
      {selectchoice === "MC" ? (
        <Multiplechoice
          step={quiz.length + 1}
          savequiz={onClicksavequiz}
          correctQuiz={[
            { ans: "", correct: false },
            { ans: "", correct: false },
            { ans: "", correct: false },
            { ans: "", correct: false },
            { ans: "", correct: false },
          ]}
        />
      ) : selectchoice === "TF" ? (
        <Truefalse step={quiz.length + 1} savequiz={onClicksavequiz} />
      ) : selectchoice === "SA" ? (
        <Shortanswer
          step={quiz.length + 1}
          savequiz={onClicksavequiz}
          correctQuiz={[{ ans: "" }]}
        />
      ) : null}

      <div className={classes.layeraddquiz}>
        <Typography className={classes.text}>Add a question</Typography>
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
