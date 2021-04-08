import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams, useHistory } from "react-router-dom";
import firebase from "firebase/app";
import swal from "sweetalert";

import {
  NavigateNext,
  NavigateBefore,
  FirstPage,
  LastPage,
} from "@material-ui/icons";

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
}));

export default function LanunchStu() {
  const classes = useStyles();
  const [quiz, setquiz] = useState([]);
  const [current, setcurrent] = useState(0);
  const [roomName, setroomName] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [type, settype] = useState();
  const [quizzingStudent, setquizzingStudent] = useState([]);
  const [waiting, setwaiting] = useState(true);

  const [stepMax, setstepMax] = useState();

  const [answer, setanswer] = useState();
  const [oldCurrent, setoldCurrent] = useState();

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
              setwaiting(false);
              let indexStu = doc.data().student.findIndex((e) => {
                return e.stuid === params.stuid;
              });
              setquizzingStudent(doc.data().student[indexStu].quizzing);
              console.log(doc.data().student[indexStu].quizzing);
              //--quiz
              doc.data().quiz.forEach((data) => {
                if (data.active === true) {
                  newQuiz.push({
                    step: data.step,
                    type: data.type,
                    choice: data.choice,
                    question: data.question,
                  });
                  let done = doc.data().student[indexStu].quizzing.find((e) => {
                    return e.step === data.step;
                  });
                  settype(doc.data().type);
                  if (done?.done) {
                    setwaiting(true);
                    // setquiz([]);
                  } else {
                    setwaiting(false);
                    setquiz([]);
                    setquiz(newQuiz);
                  }
                  console.log("quiz: ", quiz);
                } else if (data.active === false) {
                  setquiz(newQuiz);
                }
              });
              //--quizzingStudent
            } else if (doc.data().finish) {
              localStorage.removeItem("liveId");
              localStorage.removeItem("ReportId");
              let room = localStorage.getItem("RoomStudent");
              console.log("roomName, ", room);
              history.push(`/login/student/${room}`);
              // history.push("/login/student");
            }
          });
        settypeDelivery("CBT");
      } else if (res === "CBS") {
        unsubscribe = firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            let quizStudent = [];

            if (doc.data().start && doc.data().finish === false) {
              //--setโจทย์โดนไม่มีresult
              doc.data().quiz.forEach((data) => {
                let form = {
                  question: data.question,
                  type: data.type,
                  step: data.step,
                };
                if (data.type === "multiplechoice") {
                  form.choice = data.choice;
                }
                quizStudent.push(form);
              });
              setquiz(quizStudent);
              let indexStudent = doc
                .data()
                .student.findIndex((e) => e.stuid === params.stuid);
              //--setคำตอบนร.
              doc.data().student[indexStudent].quizzing.forEach((data) => {
                let form = {
                  answer: data.answer,
                  step: data.step,
                  done: false,
                };
                quizzingStudent.push(form);
              });
              setquizzingStudent(quizzingStudent);
              settype(doc.data().type);
              setroomName(doc.data().roomName);
              setstepMax(doc.data().quiz.length);
              setwaiting(false);
              settypeDelivery("CBS");
            } else if (doc.data().finish) {
              localStorage.removeItem("liveId");
              localStorage.removeItem("ReportId");
              let room = localStorage.getItem("RoomStudent");
              history.push(`/login/student/${room}`);
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
              let done = doc.data().student[indexStu].quizzing[0]?.done;
              settype(doc.data().type);
              if (done) {
                console.log("done: ", done);
                setwaiting(true);
              }
            } else if (doc.data().finish) {
              localStorage.removeItem("liveId");
              localStorage.removeItem("ReportId");
              let room = localStorage.getItem("RoomStudent");
              history.push(`/login/student/${room}`);
            }
          });
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const handleFetchAnswer = () => {
    let index;
    index = quizzingStudent.findIndex((e) => {
      return e.step == quiz[current]?.step;
    });
    return index;
    // setindexQuizzing(index);
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
    swal({
      title: "Please Confirm?",
      text: "Are you sure you want to finish the quiz?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willFinish) => {
      if (willFinish) {
        if (answer) {
          submitAnswer();
        }
        let formStudent = {
          stuid: localStorage.getItem("stuid"),
          reportId: localStorage.getItem("ReportId"),
        };
        console.log(formStudent);
        localStorage.removeItem("ReportId");
        reportService.finishQuizCBS(formStudent).then((res) => {
          history.push("/login/student/finish");
        });
      }
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

  const saveAnswerCBS = (step, answer, indexQuizzing) => {
    setanswer(answer);
    setoldCurrent(step);

    let newQuizzing = quizzingStudent;
    if (indexQuizzing >= 0) {
      newQuizzing[indexQuizzing] = { answer: answer, step: step };
    } else {
      newQuizzing.push({ answer: answer, step: step });
    }
    setquizzingStudent(newQuizzing);
  };

  const submitAnswer = () => {
    const formStudent = {
      stuid: params.stuid,
      step: oldCurrent,
      answer: answer,
    };
    if (type === "QUIZ") {
      reportService
        .answerByStudent(formStudent, params.reportId)
        .then((res) => {
          setanswer();
          setoldCurrent();
        });
    } else if (type === "QuickQuestion") {
      console.log("----------");
      reportService.submitAnswerQQ(formStudent, params.reportId).then(() => {
        setanswer();
        setoldCurrent();
      });
    }
  };

  const showContent = () => {
    return (
      <Grid container item xs={12} className={classes.content}>
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          className={classes.gridRowStep}
        >
          <Grid container item xs={5} justify="center">
            <Typography className={classes.typoStep}>
              {typeDelivery === "CBS" ? (
                <>
                  {current + 1}/{stepMax}
                </>
              ) : (
                <>{quiz[current]?.step} .</>
              )}
            </Typography>
          </Grid>
          <Grid container item xs={7} justify="center">
            {typeDelivery === "CBS" ? btnFinishQuizCBS() : null}
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          <Paper className={classes.paperQuestion}>
            <Typography className={classes.typoQuestion}>
              {quiz[current]?.question}
            </Typography>
          </Paper>
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
