import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import firebase from "firebase/app";

import {
  makeStyles,
  CssBaseline,
  Button,
  LinearProgress,
  Typography,
  ThemeProvider,
  Grid,
  Divider,
} from "@material-ui/core";

import { NavigateNext, NavigateBefore, GroupTwoTone } from "@material-ui/icons";
import axios from "axios";
import ResultMC from "../Components/resultMC";
import ResultTF from "../Components/resultTF";
import ResultSA from "../Components/resultSA";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Result() {
  const classes = useStyles();
  const [reportId, setreportId] = useState();
  const [quiz, setquiz] = useState([]);
  const [roomName, setroomName] = useState();
  const [score, setscore] = useState([]);
  const [student, setstudent] = useState();
  const [current, setcurrent] = useState(0);
  const [stepMax, setstepMax] = useState();
  const [start, setstart] = useState();

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
            setstart(doc.data().start);
          });
      }
    });
  }, []);

  const handleShowResultCBT = () => {
    return (
      <>
        {quiz[current]?.type === "multiplechoice" ? (
          <ResultMC quiz={quiz[current]} />
        ) : quiz[current]?.type === "truefalse" ? (
          <>
            <ResultTF quiz={quiz[current]} />
          </>
        ) : quiz[current]?.type === "shortanswer" ? (
          <ResultSA quiz={quiz[current]} />
        ) : null}
      </>
    );
  };

  const countStundent = () => {
    let count;
    count = score[current]?.countCorrect + score[current]?.countFail;
    return count;
  };

  const handleteacherNextStep = (newStep) => {
    const formStep = {
      oldStep: current + 1,
      newStep: newStep,
    };
    reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
      if (newStep > formStep.oldStep) {
        setcurrent(current + 1);
      } else {
        setcurrent(current - 1);
      }
    });

    console.log(formStep);
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

        <Grid item xs={12} container justify="center" alignItems="center">
          <Grid item xs={1} container>
            <GroupTwoTone />
            <Typography className={classes.typoQuestion}>
              {countStundent()} / {stepMax}
            </Typography>
          </Grid>
          <Grid item xs={11} container justify="center">
            <Button
              variant="outlined"
              onClick={() => handleteacherNextStep(current)}
            >
              <NavigateBefore />
            </Button>

            <Typography className={classes.typoQuestion}>
              {quiz[current]?.step} / {stepMax}
            </Typography>

            <Button
              variant="outlined"
              onClick={() => handleteacherNextStep(current + 2)}
            >
              <NavigateNext />
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} justify="center">
          {handleShowResultCBT()}
        </Grid>
      </Grid>
    </div>
  );
}
