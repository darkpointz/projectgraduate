import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import firebase from "firebase/app";

import {
  makeStyles,
  CssBaseline,
  Button,
  createMuiTheme,
  Typography,
  ThemeProvider,
  Grid,
  Divider,
} from "@material-ui/core";

import { NavigateNext, NavigateBefore } from "@material-ui/icons";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Result() {
  const classes = useStyles();
  const [reportId, setreportId] = useState();
  const [quiz, setquiz] = useState();
  const [roomName, setroomName] = useState();
  const [score, setscore] = useState();
  const [student, setstudent] = useState();
  const [current, setcurrent] = useState(1);
  const [stepMax, setstepMax] = useState();

  useEffect(() => {
    reportService.resultTeacher(localStorage.getItem("liveId")).then((res) => {
      setreportId(localStorage.getItem("liveId"));
      if (res === "CBT") {
        firebase
          .firestore()
          .collection("Report")
          .doc(localStorage.getItem("liveId"))
          .onSnapshot((doc) => {
            console.log(doc.data());
            setquiz(doc.data().quiz);
            setstepMax(doc.data().quiz.length);
            setroomName(doc.data().roomName);
            setscore(doc.data().score);
            setstudent(doc.data().student);
          });
      }
    });
  }, []);

  const handleShowQuiz = () => {
    return (
      <>
        {/* {quiz[current]?.type === "multiplechoice" ? (
          <LiveMC
            quiz={quiz[current]}
            type={typeDelivery}
            // quiz={quiz[current]}
            saveAnswerCBS={saveAnswerCBS}
            quizzingStudent={quizzingStudent[handleFetchAnswer()]}
            indexQuizzing={handleFetchAnswer()}
          />
        ) : quiz[current]?.type === "truefalse" ? (
          <>
            <LiveTF
              quiz={quiz[current]}
              saveAnswerCBS={saveAnswerCBS}
              quizzingStudent={quizzingStudent[handleFetchAnswer()]}
              indexQuizzing={handleFetchAnswer()}
            />
          </>
        ) : quiz[current]?.type === "shortanswer" ? (
          <LiveSA
            quiz={quiz[current]}
            saveAnswerCBS={saveAnswerCBS}
            quizzingStudent={quizzingStudent[handleFetchAnswer()]}
            indexQuizzing={handleFetchAnswer()}
          />
        ) : null} */}
      </>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid container item xs={6}>
          <Typography className={classes.typoQuestion}>{roomName}</Typography>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          <Button variant="contained" className={classes.btnSubmit}>
            Finish Quiz
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} container justify="center">
          <Button variant="outlined">
            <NavigateBefore />
          </Button>

          <Typography className={classes.typoQuestion}>
            {current} / {stepMax}
          </Typography>

          <Button variant="outlined">
            <NavigateNext />
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} justify="center">
          {handleShowQuiz()}
        </Grid>
      </Grid>
    </div>
  );
}
