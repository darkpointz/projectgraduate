import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";

import {
  makeStyles,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Divider,
} from "@material-ui/core";

import { NavigateNext, NavigateBefore, GroupTwoTone } from "@material-ui/icons";

import ResultMC from "../Components/resultMC";
import ResultTF from "../Components/resultTF";
import ResultSA from "../Components/resultSA";
import TableResult from "../Components/tableResult";
import QuickTF from "../Components/quickTF";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typoRoomName: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "32px",
  },
  btnStart: {
    backgroundColor: "#ffa100",
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    borderRadius: "18px",
  },
  typoStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    margin: "0 8px",
  },
  typoCountStudent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  iconNavigate: {
    fontSize: "28px",
  },
  typoTitleShowNoResult: {
    marginTop: "20px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "26px",
  },
  typoShowNoResult: {
    marginTop: "16px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "20px",
    textAlign: "center",
  },
  btnShowNoResult: {
    backgroundColor: "#e0f2f1",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    color: "#19A999",
    borderRadius: "14px",
    marginTop: "28px",
    boxShadow: "none",
  },
}));

export default function Result() {
  const classes = useStyles();
  const [reportId, setreportId] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [type, settype] = useState();
  const [quiz, setquiz] = useState([]);
  const [roomName, setroomName] = useState();
  const [score, setscore] = useState([]);
  const [student, setstudent] = useState([]);
  const [studentMax, setstudentMax] = useState();
  const [current, setcurrent] = useState(0);
  const [stepMax, setstepMax] = useState();
  const [start, setstart] = useState();
  const [finish, setfinish] = useState();
  const [question, setquestion] = useState();

  const history = createBrowserHistory({ forceRefresh: true });
  // let history = useHistory();
  let unsubscribe;

  //---cleanup unsubscribe ตอนนี้ใช้refreshหน้าอยู่
  useEffect(() => {
    reportService.resultTeacher(localStorage.getItem("liveId")).then((res) => {
      setreportId(localStorage.getItem("liveId"));
      settypeDelivery(res);
      console.log(res);
      if (res) {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(localStorage.getItem("liveId"))
          .onSnapshot((doc) => {
            console.log(doc.data());
            // if (doc && doc.exists) {
            //--setข้อปัจจุบัน
            doc.data().quiz.find((e) => {
              if (e.active === true) {
                setcurrent(e.step - 1);
              }
            });
            //--setโจทย์
            setquiz(doc.data().quiz);
            //--setข้อทั้งหมด
            setstepMax(doc.data().quiz.length);
            setroomName(doc.data().roomName);
            //--setผลคำตอบทั้งหมด
            setscore(doc.data().score);
            //--setนร.
            setstudent(doc.data().student);
            //--setนร.ทั้งหมด
            setstudentMax(doc.data().student.length);
            //--setว่าเริ่มทำยัง
            setstart(doc.data().start);
            //--QQ
            settype(doc.data().type);
            //--
            setfinish(false);
          });
      }
    });
  }, []);

  const serviceClearState = () => {
    setcurrent(0);
    setquiz([]);
    setstepMax();
    setroomName();
    setscore([]);
    setstudent([]);
    setstudentMax();
    setstart();
    settype();
    setfinish();
  };

  const calculatorPercent = (count) => {
    let percent = Math.round((count / studentMax) * 100);
    return percent;
  };

  const studentAnswer = () => {
    let answer = [];
    student.map((item) => {
      let stuQuiz = item.quizzing.find((e) => e.step === current + 1);
      answer.push(stuQuiz?.answer);
    });
    return answer;
  };

  const handleShowResultCBT = () => {
    return (
      <>
        {quiz[current]?.type === "multiplechoice" ? (
          <ResultMC
            quiz={quiz[current]}
            score={score[current]}
            studentMax={studentMax}
            studentAnswer={studentAnswer()}
            scoreCountCorrect={calculatorPercent(score[current]?.countCorrect)}
            scoreCountFail={calculatorPercent(score[current]?.countFail)}
          />
        ) : quiz[current]?.type === "truefalse" ? (
          <>
            <ResultTF
              quiz={quiz[current]}
              correct={quiz[current]?.correct}
              scoreCountCorrect={calculatorPercent(
                score[current]?.countCorrect
              )}
              scoreCountFail={calculatorPercent(score[current]?.countFail)}
              studentMax={studentMax}
            />
          </>
        ) : quiz[current]?.type === "shortanswer" ? (
          <ResultSA
            quiz={quiz[current]}
            score={score[current]?.countCorrect}
            student={student}
            studentMax={studentMax}
          />
        ) : null}
      </>
    );
  };

  const countStundentJoin = () => {
    let result = student?.filter((element) => {
      return element.join === true;
    });
    return result.length;
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
  };

  const handleBtnStart = () => {
    let formquiz = {
      question: question,
      type: type,
      typeDelivery: typeDelivery,
    };
    if (quiz[0]?.choice) {
      formquiz.choice = quiz[0]?.choice;
    }
    console.log(formquiz);
    if (type === "QuickQuestion") {
      reportService
        .teacherStartQuickQuestion(reportId, formquiz)
        .then((res) => {
          console.log(res);
          setstart(true);
        });
    } else {
      reportService.teacherStartQuiz(reportId).then((res) => {
        console.log(res);
        setstart(true);
      });
    }
  };

  const showNavigateStep = () => {
    return (
      <>
        <Button
          variant="outlined"
          className={classes.typoCountStudent}
          className={classes.iconNavigate}
          onClick={(e) => handleteacherNextStep(current)}
        >
          <NavigateBefore />
        </Button>

        <Typography className={classes.typoStep}>
          {quiz[current]?.step} / {stepMax}
        </Typography>

        <Button
          variant="outlined"
          className={classes.iconNavigate}
          onClick={(e) => handleteacherNextStep(current + 2)}
        >
          <NavigateNext />
        </Button>
      </>
    );
  };

  const handleShowResultCBS = () => {
    return (
      //--ตารางคะแนน
      <TableResult
        quiz={quiz}
        stepMax={stepMax}
        student={student}
        score={score}
        studentMax={studentMax}
      />
    );
  };

  const clickLaunchActivity = () => {
    history.push("/launch");
  };

  const handleShowNoResult = () => {
    return (
      <>
        <Grid item xs={12} container justify="center">
          <Typography className={classes.typoTitleShowNoResult}>
            Live Result
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Typography className={classes.typoShowNoResult}>
            You'll see live results for your room's current activity here.
            Launch a new activity to get started!
          </Typography>
        </Grid>
        <Grid item xs={12} container justify="center">
          <Button
            variant="contained"
            className={classes.btnShowNoResult}
            onClick={(e) => clickLaunchActivity()}
          >
            Launch Activity
          </Button>
        </Grid>
      </>
    );
  };

  const handleBtnFinish = () => {
    setfinish(true);
    reportService.teacherFinishQuiz(reportId).then((res) => {
      localStorage.removeItem("liveId");
      history.push("/launch");
      // return () => {
      //   unsubscribe();
      //   serviceClearState();
      // };
      // unsubscribe();
    });
  };

  const saveQuestion = (newQuestion) => {
    let newQuiz = quiz;
    newQuiz[current].question = newQuestion;
    setquestion(newQuestion);
  };

  const handleShowResultQQ = () => {
    console.log(typeDelivery);
    return (
      <>
        <QuickTF
          quiz={quiz[current]}
          score={score[current]}
          saveQuestion={saveQuestion}
          question={quiz[current].question}
          start={start}
        />
      </>
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid container item xs={6}>
          <Typography className={classes.typoRoomName}>{roomName}</Typography>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          {!start && typeDelivery ? (
            <Button
              variant="contained"
              className={classes.btnStart}
              onClick={handleBtnStart}
            >
              Start Quiz
            </Button>
          ) : start && typeDelivery ? (
            <Button
              variant="contained"
              className={classes.btnStart}
              onClick={handleBtnFinish}
            >
              Finish Quiz
            </Button>
          ) : null}
        </Grid>
        {typeDelivery ? (
          <>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} container justify="center" alignItems="center">
              {typeDelivery === "CBT" ? (
                <Grid item xs={3} container>
                  <Typography className={classes.typoCountStudent}>
                    Students Answered {countStundent()} / {studentMax}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={3} container />
              )}

              <Grid item xs={8} container justify="center" alignItems="center">
                {typeDelivery === "CBT" ? showNavigateStep() : null}
              </Grid>

              <Grid item xs={1} container>
                <GroupTwoTone />
                <Typography className={classes.typoCountStudent}>
                  {countStundentJoin()} / {studentMax}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </>
        ) : null}
        <Grid item xs={12} container justify="center">
          {typeDelivery === "CBT"
            ? handleShowResultCBT()
            : typeDelivery === "CBS"
            ? handleShowResultCBS()
            : type === "QuickQuestion"
            ? handleShowResultQQ()
            : handleShowNoResult()}
        </Grid>
      </Grid>
    </div>
  );
}
