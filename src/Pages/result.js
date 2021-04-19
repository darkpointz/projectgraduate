import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import firebase from "firebase/app";
import { useHistory } from "react-router-dom";
import { createBrowserHistory } from "history";
import schedule from "node-schedule";
import Cookies from "universal-cookie";
import swal from "sweetalert";

import {
  makeStyles,
  CssBaseline,
  Button,
  Typography,
  Grid,
  Divider,
  Badge,
} from "@material-ui/core";

import { NavigateNext, NavigateBefore, GroupTwoTone } from "@material-ui/icons";

import ResultMC from "../Components/resultMC";
import ResultTF from "../Components/resultTF";
import ResultSA from "../Components/resultSA";
import TableResult from "../Components/tableResult";
import QuickTF from "../Components/quickTF";
import QuickMC from "../Components/quickMC";
import QuickSA from "../Components/quickSA";
import DialogShowStudent from "../Components/dialogShowStudent";
import CountDownTime from "../Components/countDownTime";

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
  const cookies = new Cookies();
  const [countTime, setcountTime] = useState();
  const [reportId, setreportId] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [type, settype] = useState();
  const [quiz, setquiz] = useState([]);
  const [method, setmethod] = useState();
  const [roomName, setroomName] = useState();
  const [score, setscore] = useState([]);
  const [student, setstudent] = useState([]);
  const [studentMax, setstudentMax] = useState();
  const [current, setcurrent] = useState(0);
  const [stepMax, setstepMax] = useState();
  const [start, setstart] = useState();
  const [finish, setfinish] = useState();
  const [question, setquestion] = useState("");
  const [answerQQ, setanswerQQ] = useState([]);
  const [openDialogShowStudent, setopenDialogShowStudent] = useState(false);

  // const history = createBrowserHistory({ forceRefresh: true });
  let history = useHistory();

  //---cleanup unsubscribe ตอนนี้ใช้refreshหน้าอยู่
  useEffect(() => {
    let unsubscribe;
    reportService.resultTeacher(localStorage.getItem("liveId")).then((res) => {
      setreportId(localStorage.getItem("liveId"));
      settypeDelivery(res);

      if (res) {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(localStorage.getItem("liveId"))
          .onSnapshot((doc) => {
            let createdAt = new Date();
            console.log("createdAt: ", createdAt);
            // let endAt = cookies.get("endAt");
            let endAt = new Date(doc.data().method.endAt);
            console.log("endAt: ", endAt);
            console.log("e------ ");
            let sum = (endAt - createdAt) / 1000;
            setcountTime(parseInt(sum));
            if (sum <= 0 && sum) {
              // if (createdAt >= endAt && endAt) {
              handleBtnFinish();
            }
            //--setข้อปัจจุบัน
            doc.data().quiz.find((e) => {
              if (e.active === true) {
                setcurrent(e.step - 1);
              }
            });
            //--setโจทย์
            setquiz(doc.data().quiz);
            //--setOption
            setmethod(doc.data().method);
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
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

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

  const countStudentJoin = () => {
    let result = student?.filter((element) => {
      return element.join === true;
    });
    return result.length;
  };

  const countStudent = () => {
    let count;
    count = score[current]?.countCorrect + score[current]?.countFail;
    return count;
  };

  const handleteacherNextStep = (newStep) => {
    const formStep = {
      oldStep: current + 1,
      newStep: newStep,
    };
    console.log("oldformStep ", formStep);
    console.log("----------------......");
    let endAt, min, sec;
    if (method.timeEachQuestion) {
      min = method.minEach;
      sec = method.secEach;
      let newcreatedAt = new Date();
      console.log("newcreatedAt.endAtL::: ", newcreatedAt);
      newcreatedAt.setMinutes(
        newcreatedAt.getMinutes() + min,
        newcreatedAt.getSeconds() + sec
      );
      endAt = new Date(newcreatedAt);
      formStep.endAt = endAt;
      console.log("formStep.endAtL::: ", endAt);
    }
    if (endAt) {
      // formStep.oldStep = newStep;
      reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
        const job = schedule.scheduleJob(endAt, function () {
          formStep.oldStep = newStep;
          reportService.teacherNextStepCBT(reportId, formStep);
          job.cancel();
        });

        if (newStep > current + 1) {
          setcurrent(current + 1);
        } else {
          setcurrent(current - 1);
        }
      });
    } else {
      reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
        if (newStep > formStep.oldStep) {
          setcurrent(current + 1);
        } else {
          setcurrent(current - 1);
        }
      });
    }
  };

  //-------เดิม
  // const handleteacherNextStep = (newStep) => {
  //   const formStep = {
  //     oldStep: current + 1,
  //     newStep: newStep,
  //   };
  //   console.log("formStep ", formStep);
  //   let endAt, min, sec;
  //   reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
  //     if (newStep > formStep.oldStep) {
  //       if (method.timeEachQuestion) {
  //         min = method.minEach;
  //         sec = method.secEach;
  //         let newcreatedAt = new Date();
  //         console.log("newcreatedAt: ", newcreatedAt);
  //         newcreatedAt.setMinutes(
  //           newcreatedAt.getMinutes() + min,
  //           newcreatedAt.getSeconds() + sec
  //         );
  //         endAt = new Date(newcreatedAt);
  //         formStep.endAt = endAt;
  //       }
  //       console.log("newcreatedAt: ", endAt);
  //       if (endAt) {
  //         formStep.oldStep = newStep;
  //         const job = schedule.scheduleJob(endAt, function () {
  //           reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
  //             console.log("-*-*-*-*");
  //           });
  //           job.cancel();
  //         });
  //       }
  //       setcurrent(current + 1);
  //     } else {
  //       if (method.timeEachQuestion) {
  //         min = method.minEach;
  //         sec = method.secEach;
  //         let newcreatedAt = new Date();
  //         console.log("newcreatedAt: ", newcreatedAt);
  //         newcreatedAt.setMinutes(
  //           newcreatedAt.getMinutes() + min,
  //           newcreatedAt.getSeconds() + sec
  //         );
  //         endAt = new Date(newcreatedAt);
  //         formStep.endAt = endAt;
  //         console.log("endAt: ", endAt);
  //       }
  //       if (endAt) {
  //         formStep.oldStep = newStep;
  //         console.log("newformStep ", formStep);
  //         const job = schedule.scheduleJob(endAt, function () {
  //           reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
  //             console.log("-*-*-*-*");
  //           });
  //           job.cancel();
  //         });
  //       }
  //       setcurrent(current - 1);
  //     }
  //   });
  // };

  const handleBtnStart = () => {
    let formquiz = {
      question: question,
      type: type,
      typeDelivery: typeDelivery,
    };
    if (quiz[0]?.choice) {
      formquiz.choice = quiz[0]?.choice;
    }
    let min, sec;
    const formTime = {};

    if (type === "QuickQuestion") {
      reportService
        .teacherStartQuickQuestion(reportId, formquiz)
        .then((res) => {
          console.log(res);
          setstart(true);
        });
    } else {
      //--setเวลา
      if (method.timeQuiz) {
        min = method.minQuiz;
        sec = method.secQuiz;
        let newcreatedAt = new Date();
        newcreatedAt.setMinutes(
          newcreatedAt.getMinutes() + min,
          newcreatedAt.getSeconds() + sec
        );
        formTime.endAt = new Date(newcreatedAt);
        console.log("formTime.endAt: ", formTime.endAt);
        cookies.set("endAt", formTime.endAt, { path: "/" });
      } else if (method.timeEachQuestion) {
        min = method.minEach;
        sec = method.secEach;
        let newcreatedAt = new Date();
        newcreatedAt.setMinutes(
          newcreatedAt.getMinutes() + min,
          newcreatedAt.getSeconds() + sec
        );
        formTime.endAt = new Date(newcreatedAt);
        cookies.set("endAt", formTime.endAt, { path: "/" });
      }

      reportService.teacherStartQuiz(reportId, formTime).then((res) => {
        //--setscheduleถ้ามี
        if (formTime.endAt && method.timeQuiz) {
          let createdAt = new Date();
          // let endAt = cookies.get("endAt");
          let endAt = new Date(method.endAt);
          let sum = (endAt - createdAt) / 1000;
          setcountTime(parseInt(sum));
          const job = schedule.scheduleJob(formTime.endAt, function () {
            console.log("---++++384+++--");
            handleBtnFinish();
            job.cancel();
          });
        } else if (formTime.endAt && method.timeEachQuestion) {
          const formStep = {
            oldStep: 1,
            newStep: 1,
          };
          console.log("formStep123", formStep);
          const job = schedule.scheduleJob(formTime.endAt, function () {
            reportService.teacherNextStepCBT(reportId, formStep);
            // handleBtnFinish();
            job.cancel();
          });
        }

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
    console.log("reportId1 ", reportId);
    if (type === "QuickQuestion") {
      swal({
        title: "Please Confirm",
        text: "You want to save this quick question?",
        icon: "warning",
        buttons: ["Don't Save", "Save"],
      }).then((willFinish) => {
        if (willFinish) {
          reportService
            .teacherFinishQuizAndSaveQuickQuestion(
              localStorage.getItem("liveId"),
              localStorage.getItem("userId")
            )
            .then((res) => {
              clearLocalStorageFinish();
            });
        } else if (!willFinish) {
          reportService
            .teacherFinishQuiz(localStorage.getItem("liveId"))
            .then((res) => {
              clearLocalStorageFinish();
            });
        }
      });
    } else if (type === "QUIZ") {
      reportService
        .teacherFinishQuiz(localStorage.getItem("liveId"))
        .then((res) => {
          clearLocalStorageFinish();
        });
    }
  };

  const clearLocalStorageFinish = () => {
    localStorage.removeItem("liveId");
    cookies.remove("endAt", { path: "/" });
    history.push("/launch");
  };

  const saveQuestionQQ = (newQuestion) => {
    let newQuiz = quiz;
    newQuiz[current].question = newQuestion;
    setquiz(newQuiz);
    setquestion(newQuestion);
  };

  const saveAnswerQQ = (newAnswer, index) => {
    let newQuiz = quiz;
    newQuiz[current].choice[index] = newAnswer;
    console.log(newQuiz);
    setquiz(newQuiz);
  };

  const handleShowResultQQ = () => {
    return (
      <>
        {typeDelivery === "QQTF" ? (
          <QuickTF
            quiz={quiz[current]}
            score={score[current]}
            saveQuestion={saveQuestionQQ}
            question={quiz[current].question}
            start={start}
          />
        ) : typeDelivery === "QQMC" ? (
          <QuickMC
            quiz={quiz[current]}
            score={score}
            saveQuestion={saveQuestionQQ}
            saveAnswer={saveAnswerQQ}
            answerQQ={answerQQ}
            question={quiz[current].question}
            start={start}
          />
        ) : typeDelivery === "QQSA" ? (
          <QuickSA
            quiz={quiz[current]}
            saveQuestion={saveQuestionQQ}
            question={quiz[current].question}
            start={start}
            student={student}
          />
        ) : null}
      </>
    );
  };

  const handleCloseDialogShowStudent = () => {
    setopenDialogShowStudent(false);
  };

  const countStudentRaiseHand = () => {
    let count = 0;
    student.map((item) => {
      if (item.raiseHand === true) {
        count = count + 1;
      }
    });
    return count;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid container item xs={6}>
          <Typography className={classes.typoRoomName}>{roomName}</Typography>
          {countTime ? <CountDownTime counter={countTime} /> : null}
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
                    Students Answered {countStudent()} / {studentMax}
                  </Typography>
                </Grid>
              ) : (
                <Grid item xs={3} container />
              )}

              <Grid item xs={8} container justify="center" alignItems="center">
                {typeDelivery === "CBT" ? showNavigateStep() : null}
              </Grid>

              <Grid item xs={1} container>
                {/* <GroupTwoTone />
                <Typography className={classes.typoCountStudent}>
                  {countStudentJoin()} / {studentMax}
                </Typography> */}
                <Badge badgeContent={countStudentRaiseHand()} color="primary">
                  <Button
                    className={classes.typoCountStudent}
                    onClick={(e) => setopenDialogShowStudent(true)}
                  >
                    <GroupTwoTone />
                    {countStudentJoin()} / {studentMax}
                  </Button>
                </Badge>
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
      <DialogShowStudent
        open={openDialogShowStudent}
        handleClose={handleCloseDialogShowStudent}
        student={student}
      />
    </div>
  );
}
