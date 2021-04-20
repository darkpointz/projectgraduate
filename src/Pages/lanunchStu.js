import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import swal from "sweetalert";
import clsx from "clsx";
import Cookies from "universal-cookie";
import { PanTool } from "@material-ui/icons";
import schedule from "node-schedule";

import {
  AppBar,
  CssBaseline,
  IconButton,
  Grid,
  Toolbar,
  Typography,
  Button,
  Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import LiveMC from "../Components/liveMC";
import LiveTF from "../Components/liveTF";
import LiveSA from "../Components/liveSA";
import WaitingForActivity from "../Components/waitingForActivity";
import PaginationLanunchStu from "../Components/paginationLanunchStu";
import CountDownTime from "../Components/countDownTime";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // width: "100%",
  },
  appBar: {
    backgroundColor: "#19A999",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "32px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "30px",
    },
  },
  titleRoom: {
    flexGrow: 1,
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "32px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
      fontWeight: 500,
    },
  },
  typoBtn: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
    color: "white",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  typotitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "32px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "16px",
    },
  },
  typoStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "32px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "28px",
    },
  },
  btnSubmit: {
    backgroundColor: "#ffa100",
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    borderRadius: "18px",
    marginRight: "32px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
    },
  },
  paperQuestion: {
    width: "70%",
    backgroundColor: "#D2FFFB",
    display: "flex",
    justifyContent: "center",
    padding: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      padding: theme.spacing(1),
    },
  },
  typoQuestion: {
    margin: "12px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    color: "#019592",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
    gridContent: {
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        width: "80%",
      },
    },
  },
  btnNavigate: {
    backgroundColor: "#19A999",
  },
  content: {
    padding: theme.spacing(10, 5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3, 1),
    },
  },
  gridRowStep: {
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(2),
    },
  },
  iconPanTool: {},
  iconPanToolTrue: {
    color: "#5FCCF5",
  },
  typoIconPanTool: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    marginRight: "8px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "18px",
      marginRight: "6px",
    },
  },
}));

export default function LanunchStu() {
  const classes = useStyles();
  const cookies = new Cookies();

  const [quiz, setquiz] = useState([]);
  const [current, setcurrent] = useState(0);
  const [roomName, setroomName] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [type, settype] = useState();
  const [quizzingStudent, setquizzingStudent] = useState([]);
  const [waiting, setwaiting] = useState(true);
  const [SQ, setSQ] = useState(false);
  const [method, setmethod] = useState();

  const [currentTime, setcurrentTime] = useState();
  const [endAt, setendAt] = useState();
  const [stepMax, setstepMax] = useState();
  const [raiseHand, setraiseHand] = useState();
  const [answer, setanswer] = useState();
  const [oldCurrent, setoldCurrent] = useState();
  const [indexAnswerMC, setindexAnswerMC] = useState();

  let params = useParams();

  let history = useHistory();
  useEffect(() => {
    const formStudent = {
      reportId: params.reportId,
      stuid: params.stuid,
    };
    let unsubscribe;
    reportService.getQuizByStudent(formStudent).then((res) => {
      console.log(res);
      if (res === "CBT") {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            let newQuiz = [];
            console.log("doc", doc.data());
            if (doc.data().start && doc.data().finish === false) {
              let createdAt = new Date();
              // let createdAt = new Date().toISOString();

              let currentDate = new Date();
              // setcurrentTime(new Date());
              let endDate = new Date(doc.data().method.endAt);
              console.log("createdAt: ", createdAt / 1000);
              console.log("currentDate: ", currentDate);
              console.log("endDate: ", endDate);
              let sum = (endDate - currentDate) / 1000;
              console.log("sum: ", parseInt(sum));
              setcurrentTime(parseInt(sum));
              setendAt(endDate);
              // if (createdAt >= endAt && endAt) {
              if (sum <= 0 && sum) {
                console.log("----: ", endDate);
                let reportId = params.reportId;
                let formStudent = {
                  stuid: localStorage.getItem("stuid"),
                  reportId: reportId,
                };
                // finishQuizCBSRemoveState(formStudent);
                setwaiting(true);
              } else {
                setwaiting(false);
                setroomName(doc.data().roomName);
                let indexStu = doc.data().student.findIndex((e) => {
                  return e.stuid === params.stuid;
                });
                setraiseHand(doc.data().student[indexStu].raiseHand);
                setquizzingStudent(doc.data().student[indexStu].quizzing);
                setmethod(doc.data().method);
                //--quiz
                doc.data().quiz.forEach((data) => {
                  if (data.active === true) {
                    newQuiz.push({
                      step: data.step,
                      type: data.type,
                      question: data.question,
                    });
                    if (data.type === "multiplechoice") {
                      if (doc.data().method.SA === true) {
                        newQuiz[0].choice = shuffleArray(data.choice);
                      } else {
                        newQuiz[0].choice = data.choice;
                      }
                    }
                    let done = doc
                      .data()
                      .student[indexStu].quizzing.find((e) => {
                        return e.step === data.step;
                      });
                    settype(doc.data().type);
                    if (done?.done) {
                      setwaiting(true);
                      setquiz([]);
                    } else {
                      setwaiting(false);
                      setquiz([]);
                      setquiz(newQuiz);
                    }
                  } else if (data.active === false) {
                    setquiz(newQuiz);
                  }
                });
                if (newQuiz.length === 0) {
                  setwaiting(true);
                }
              }
              //finish
            } else if (doc.data().finish) {
              if (doc.data().method.SAAA) {
                reportService
                  .scoreStudent(params.reportId, params.stuid)
                  .then((res) => {
                    swal(
                      "Finish!",
                      `Score: ${res.data.score}/${doc.data().quiz.length} !`,
                      "success"
                    );
                  });
                removeLocalStorage();
              } else {
                removeLocalStorage();
              }
            }
          });
        settypeDelivery("CBT");
      } else if (res === "CBS") {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            console.log(quiz);
            let quizStudent = [];

            if (doc.data().start && doc.data().finish === false) {
              let currentDate = new Date();
              // setcurrentTime(new Date());
              let endDate = new Date(doc.data().method.endAt);
              console.log("endAt: ", endDate);
              console.log("currentDate: ", currentDate);
              let sum = (endDate - currentDate) / 1000;
              console.log("sum: ", parseInt(sum));

              cookies.set("countTime", parseInt(sum), { path: "/" });
              setcurrentTime(parseInt(sum));
              if (sum <= 0 && sum) {
              } else if (sum) {
                // if (createdAt >= endAt && endAt) {
                const job = schedule.scheduleJob(endDate, function () {
                  finishQuizCBSRemoveState(formStudent);
                  job.cancel();
                });
              } else {
                //--setโจทย์โดนไม่มีresult
                doc.data().quiz.forEach((data) => {
                  let form = {
                    question: data.question,
                    type: data.type,
                    step: data.step,
                  };
                  if (data.type === "multiplechoice") {
                    if (doc.data().method.SA === true) {
                      form.choice = shuffleArray(data.choice);
                    } else {
                      form.choice = data.choice;
                    }
                  }
                  quizStudent.push(form);
                });
                // const job = schedule.scheduleJob(endAt, function () {
                //   job.cancel();
                // });
                setmethod(doc.data().method);
                //--- Shuffle Questions
                if (doc.data().method.SQ === true && !cookies.get("quiz")) {
                  // if (doc.data().method.SQ === true && quiz.length === 0) {
                  setSQ(doc.data().method.SQ);
                  let newquiz = shuffleArray(quizStudent);
                  setquiz(newquiz);
                  cookies.set("quiz", newquiz, { path: "/" });
                } else if (
                  doc.data().method.SQ === true &&
                  cookies.get("quiz")
                ) {
                  setSQ(doc.data().method.SQ);
                  setquiz(cookies.get("quiz"));
                } else if (
                  doc.data().method.SQ === false &&
                  quiz.length === 0
                ) {
                  setquiz(quizStudent);
                }

                let indexStudent = doc
                  .data()
                  .student.findIndex((e) => e.stuid === params.stuid);
                setraiseHand(doc.data().student[indexStudent].raiseHand);
                // setscore(doc.data().student[indexStudent].countScore);
                //--setคำตอบนร.
                if (quizzingStudent.length === 0) {
                  let quizzingStudentFB = [];
                  doc.data().student[indexStudent].quizzing.forEach((data) => {
                    let form = {
                      answer: data.answer,
                      step: data.step,
                      done: false,
                    };
                    quizzingStudentFB.push(form);
                  });
                  setquizzingStudent(quizzingStudentFB);
                }
                //--setscore

                settype(doc.data().type);
                setroomName(doc.data().roomName);
                setstepMax(doc.data().quiz.length);
                setwaiting(false);
                settypeDelivery("CBS");
              }
            } else if (doc.data().finish) {
              removeLocalStorage();
            }
          });
      } else if (res === "QuickQuestion") {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            if (doc.data().start && doc.data().finish === false) {
              setwaiting(false);
              console.log("doc", doc.data());

              setquiz(doc.data().quiz);
              let indexStu = doc.data().student.findIndex((e) => {
                return e.stuid === params.stuid;
              });
              setraiseHand(doc.data().student[indexStu].raiseHand);
              let done = doc.data().student[indexStu].quizzing[0]?.done;
              settype(doc.data().type);
              settypeDelivery(doc.data().method);
              if (done) {
                console.log("done: ", done);
                setwaiting(true);
              }
            } else if (doc.data().finish) {
              removeLocalStorage();
            }
          });
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
        cookies.remove("quiz", { path: "/" });
      }
    };
  }, []);

  const removeLocalStorage = () => {
    localStorage.removeItem("liveId");
    localStorage.removeItem("ReportId");
    cookies.remove("countTime", { path: "/" });
    let room = localStorage.getItem("RoomStudent");
    history.push(`/login/student/${room}`);
  };

  const shuffleArray = (array) => {
    let newarray = array;
    for (let i = newarray.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
      //--เก่า
      // let temp = newarray[i];
      // newarray[i] = newarray[j];
      // newarray[j] = temp;
    }
    return newarray;
  };

  const handleFetchAnswer = () => {
    let index;
    index = quizzingStudent.findIndex((e) => {
      return e.step == quiz[current]?.step;
    });
    return index;
  };

  const handleShowQuiz = () => {
    return (
      <>
        {quiz[current]?.type === "multiplechoice" ? (
          <>
            <LiveMC
              quiz={quiz[current]}
              type={typeDelivery}
              saveAnswerCBS={saveAnswerCBS}
              quizzingStudent={quizzingStudent[handleFetchAnswer()]}
              indexQuizzing={handleFetchAnswer()}
            />
          </>
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
        ) : null}
      </>
    );
  };

  const handlebtnFinishQuizCBS = () => {
    let reportId = params.reportId;
    let stuid = params.stuid;
    let formStudent = {
      stuid: stuid,
      reportId: reportId,
    };
    swal({
      title: "Please Confirm",
      text: "Are you sure you want to finish the quiz?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willFinish) => {
      if (willFinish) {
        if (answer) {
          submitAnswer();
        }
        if (method.SAAA) {
          reportService.scoreStudent(reportId, stuid).then((res) => {
            swal("Finish!", `Score: ${res.data.score}/${stepMax} !`, "success");
          });
        }
        finishQuizCBSRemoveState(formStudent);
      }
    });
  };

  const finishQuizCBSRemoveState = (formStudent) => {
    localStorage.removeItem("ReportId");
    cookies.remove("quiz", { path: "/" });
    reportService.finishQuizCBS(formStudent).then((res) => {
      history.push("/login/student/finish");
    });
  };

  const handleLogout = () => {
    swal({
      title: "Please Confirm?",
      text: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        history.push("/login/student/0");
        localStorage.removeItem("RoomStudent");
        localStorage.removeItem("stuid");
        localStorage.removeItem("ReportId");
        cookies.remove("quiz", { path: "/" });
      }
    });
  };

  const btnFinishQuizCBS = () => {
    return (
      <Button
        variant="contained"
        className={classes.btnSubmit}
        onClick={handlebtnFinishQuizCBS}
      >
        Finish Quiz
      </Button>
    );
  };

  const btnSubmitCBT = () => {
    return (
      <>
        <Grid container item xs={6} justify="center">
          <Button
            variant="contained"
            className={classes.btnSubmit}
            onClick={() => submitAnswer()}
          >
            Submit answer
          </Button>
        </Grid>
      </>
    );
  };

  const saveAnswerCBS = (step, answer, indexQuizzing, index) => {
    if (currentTime && currentTime <= 0) {
      let reportId = params.reportId;
      let formStudent = {
        stuid: localStorage.getItem("stuid"),
        reportId: reportId,
      };
      finishQuizCBSRemoveState(formStudent);
    } else {
      setanswer(answer);
      setoldCurrent(step);
      let newQuizzing = quizzingStudent;
      console.log("newQuizzin----g: ", newQuizzing);
      if (index || index === 0) {
        console.log("indexAnswerMC: ", index);
        setindexAnswerMC(index);
      }

      console.log("indexQuizzing: ", indexQuizzing);
      if (indexQuizzing >= 0) {
        newQuizzing[indexQuizzing] = { answer: answer, step: step };
      } else {
        newQuizzing.push({ answer: answer, step: step });
      }
      setquizzingStudent(newQuizzing);
      console.log("newQuizzing: ", newQuizzing);
    }
  };

  //--submitCBT
  const submitAnswer = () => {
    const formStudent = {
      stuid: params.stuid,
      step: oldCurrent,
      answer: answer,
    };
    let createdAt = new Date();
    // let createdAt = new Date().toISOString();
    console.log("createdAt603: ", createdAt);
    console.log("currentTime603: ", currentTime);

    if (type === "QUIZ") {
      if (createdAt < endAt || !endAt) {
        // if (!currentTime) {
        reportService
          .answerByStudent(formStudent, params.reportId)
          .then((res) => {
            if (method.SADA) {
              if (res.data.result === true) {
                swal({
                  title: "Correct !",
                  icon: "success",
                });
              } else if (res.data.result === false) {
                swal({
                  title: "Incorrect !",
                  icon: "error",
                });
              }
            }
            setanswer();
            setoldCurrent();
          });
      }
      //  else if (currentTime <= 0 && currentTime) {
      else if (createdAt >= endAt && endAt) {
        console.log("createdAtendAt: ");
        let reportId = params.reportId;
        let formStudent = {
          stuid: localStorage.getItem("stuid"),
          reportId: reportId,
        };
        // finishQuizCBSRemoveState(formStudent);
        setwaiting(true);
      }
    } else if (type === "QuickQuestion") {
      console.log("typeDelivery: ", typeDelivery);
      if (typeDelivery === "QQMC") {
        formStudent.indexAnswerMC = indexAnswerMC;
      } else {
        formStudent.indexAnswerMC = "-1";
      }
      console.log("formStudent: ", formStudent);
      reportService.submitAnswerQQ(formStudent, params.reportId).then(() => {
        setanswer();
        setoldCurrent();
        setindexAnswerMC();
      });
    }
  };

  const handleRaiseHand = () => {
    let newRaiseHand = !raiseHand;
    let formStudent = {
      reportId: params.reportId,
      stuid: params.stuid,
      raiseHand: newRaiseHand,
    };
    reportService.raiseHandStudent(formStudent).then(() => {
      setraiseHand(newRaiseHand);
    });
  };

  const handleEndTime = (count) => {
    setcurrentTime(count);
  };

  const showContent = () => {
    return (
      <Grid container item xs={12} className={classes.content}>
        <Grid container item xs={12} md={12} justify="center">
          {currentTime ? (
            <CountDownTime
              counter={currentTime}
              handleEndTime={handleEndTime}
            />
          ) : null}
          {/* {currentTime} */}
        </Grid>
        <Grid container item xs={7} md={7} />
        <Grid container item xs={5} md={5} justify="center">
          {typeDelivery === "CBS" ? btnFinishQuizCBS() : null}
        </Grid>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          className={classes.gridRowStep}
        >
          <Grid container item xs={5} md={5} justify="center">
            <Typography className={classes.typoStep}>
              {current + 1}
              {/* {typeDelivery === "CBS" ? (
                <>
                  {current + 1} / {stepMax}
                </>
              ) : (
                <>{quiz[current]?.step} .</>
              )} */}
            </Typography>
          </Grid>
          <Grid container item xs={2} md={2} />
          <Grid
            container
            item
            xs={5}
            md={5}
            justify="center"
            alignItems="center"
          >
            <Typography className={classes.typoIconPanTool}>
              {raiseHand === false ? <>Raise hand :</> : <>Lower hand :</>}
            </Typography>
            <IconButton onClick={handleRaiseHand}>
              {/* <PanTool className={classes.iconPanTool} /> */}
              <PanTool
                className={clsx(classes.iconPanTool, {
                  [classes.iconPanToolTrue]: raiseHand === true,
                })}
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          {quiz[current]?.question === "" ? null : (
            <Paper className={classes.paperQuestion}>
              <Typography className={classes.typoQuestion}>
                {quiz[current]?.question}
              </Typography>
            </Paper>
          )}
        </Grid>

        <Grid container item xs={12} justify="center">
          {handleShowQuiz()}
        </Grid>
        {typeDelivery === "CBS" ? (
          <PaginationLanunchStu
            current={current}
            setcurrent={setcurrent}
            stepMax={stepMax}
            submitAnswer={submitAnswer}
            answer={answer}
            quiz={quiz}
            quizzingStudent={quizzingStudent}
            SQ={SQ}
          />
        ) : (
          btnSubmitCBT()
        )}
      </Grid>
    );
  };

  return (
    // <div className={classes.root}>
    <>
      <CssBaseline />
      <Grid container>
        <Grid container item xs={12}>
          <AppBar position="sticky" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Qton
              </Typography>

              <Typography variant="h6" className={classes.titleRoom}>
                {roomName}
              </Typography>

              <IconButton>
                <ExitToApp className={classes.typoBtn} />
                <Button
                  className={classes.typoBtn}
                  onClick={handleLogout}
                  // onClick={() => history.push("/login/student")}
                >
                  Logout
                </Button>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        {waiting ? <WaitingForActivity /> : showContent()}
      </Grid>
    </>
    // </div>
  );
}
