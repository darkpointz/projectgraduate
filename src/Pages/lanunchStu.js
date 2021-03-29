import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { createBrowserHistory } from "history";
import { teal } from "@material-ui/core/colors";
import clsx from "clsx";

import {
  NavigateNext,
  NavigateBefore,
  FirstPage,
  LastPage,
} from "@material-ui/icons";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  Avatar,
  Box,
  Paper,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import LiveMC from "../Components/liveMC";
import LiveTF from "../Components/liveTF";
import LiveSA from "../Components/liveSA";
import WaitingForActivity from "../Components/waitingForActivity";

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
  iconNavigate: {
    fontSize: "28px",
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
  btnStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "14px",
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  },
  btnTrue: {
    backgroundColor: "#1de9b6",
  },
}));

export default function LanunchStu() {
  const classes = useStyles();
  const [quiz, setquiz] = useState([]);
  const [current, setcurrent] = useState(0);
  const [roomName, setroomName] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [quizzingStudent, setquizzingStudent] = useState([]);
  const [waiting, setwaiting] = useState(true);
  const [step, setstep] = useState();

  const [stepMax, setstepMax] = useState();
  const [page, setpage] = useState(0);
  const [maxPage, setmaxPage] = useState(5);
  const [mid, setmid] = useState(2);

  const [answer, setanswer] = useState();
  const [oldCurrent, setoldCurrent] = useState();

  let params = useParams();
  const history = createBrowserHistory({ forceRefresh: true });
  useEffect(() => {
    const formStudent = {
      reportId: params.reportId,
      stuid: params.stuid,
    };

    reportService.getQuizByStudent(formStudent).then((res) => {
      if (res === "CBT") {
        firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            let newQuiz = [];
            console.log("doc", doc.data());

            if (doc.data().start) {
              setwaiting(false);
              let indexStu = doc.data().student.findIndex((e) => {
                return e.stuid === params.stuid;
              });
              setquizzingStudent(doc.data().student[indexStu].quizzing);
              //--quiz
              doc.data().quiz.forEach((data) => {
                if (data.active === true) {
                  newQuiz.push({
                    step: data.step,
                    type: data.type,
                    choice: data.choice,
                    question: data.question,
                  });
                  setstep(data.step);
                  let done = doc.data().student[indexStu].quizzing.find((e) => {
                    return e.step === data.step;
                  });
                  console.log("quizzingStudent: ", done);
                  if (done?.done) {
                    setwaiting(true);
                    // setquiz([]);
                  } else {
                    setwaiting(false);
                    setquiz(newQuiz);
                  }
                } else if (data.active === false) {
                  setquiz(newQuiz);
                }
              });
              //--quizzingStudent
            } else {
              setwaiting(true);
            }
          });
        settypeDelivery("CBT");
      } else {
        setquiz(res.quizStudent);
        setroomName(res.roomName);
        setstepMax(res.stepMax);
        setwaiting(false);
        settypeDelivery("CBS");
        setquizzingStudent(res.quizzingStudent);
      }
    });
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
        ) : null}
      </>
    );
  };

  const handleFirstPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    setcurrent(0);
    setpage(0);
    setmaxPage(5);
    setmid(2);
  };

  const handleLastPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    setcurrent(stepMax - 1);
    setpage(stepMax - 5);
    setmaxPage(stepMax);
    setmid(stepMax - 3);
  };

  const handleNavigateNext = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    if (current !== stepMax - 1) {
      setcurrent(current + 1);
    }

    if (maxPage === stepMax) {
    } else if (maxPage - current === 3) {
      setpage(page + 1);
      setmaxPage(maxPage + 1);
    }

    //setmid
    if (current + 1 >= 3 && current < stepMax - 3) {
      setmid(current + 1);
    }
  };

  const handleNavigateBefore = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    if (current !== 0) {
      setcurrent(current - 1);
    }

    if (page === 0) {
    } else if (maxPage - current === 3) {
      setpage(page - 1);
      setmaxPage(maxPage - 1);
    }

    //setmid
    if (current <= 3) {
      setmid(2);
    } else if (current > stepMax - 3) {
      setmid(stepMax - 3);
    } else if (current - 1 >= 3 && current > 3) {
      console.log("cuure: ", current);
      setmid(current - 1);
    }
  };

  const handleSelectPage = (index) => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswer();
    }

    setcurrent(index);
    //กรณีกดขึ้นหน้า
    if (index > mid) {
      let increase = index - mid;
      //--ชนขอบไม่ต้องทำอะไร
      if (maxPage === stepMax) {
      }
      //กัน+2ไม่ให้เกินขอบเลย+แค่1
      else if (maxPage + increase === stepMax + 1) {
        setmaxPage(maxPage + 1);
        setpage(page + 1);
        setmid(mid + 1);
      } else {
        setmaxPage(maxPage + increase);
        setpage(page + increase);
        setmid(index);
      }
    }
    //กรณีกดถอยหลัง
    else if (mid > index) {
      let decrease = mid - index;
      //--ชนขอบไม่ต้องทำอะไร
      if (page === 0) {
      }
      //กัน-2แล้วเกินขอบเลย-1แค่1
      else if (page - decrease < 0) {
        setpage(page - 1);
        setmaxPage(maxPage - 1);
        setmid(mid - 1);
      } else {
        setmaxPage(maxPage - decrease);
        setpage(page - decrease);
        setmid(index);
      }
    }
  };

  const handleCheckStyleStep = (index) => {
    let tf;
    quizzingStudent.find((e) => {
      if (e.step === index) {
        tf = true;
      }
    });
    if (!tf) {
      tf = false;
    }
    return tf;
  };

  const btnNavigateStepCBS = () => {
    return (
      <>
        <Grid container item xs={12} justify="center">
          <div style={{ marginRight: "8px" }}>
            <Button variant="outlined" onClick={handleFirstPage}>
              <FirstPage className={classes.iconNavigate} />
            </Button>
            <Button variant="outlined" onClick={handleNavigateBefore}>
              <NavigateBefore className={classes.iconNavigate} />
            </Button>
          </div>

          {quiz.slice(page, maxPage).map((item, index) => (
            <Button
              variant="outlined"
              // className={classes.btnStep}
              className={clsx(classes.btnStep, {
                [classes.btnTrue]: handleCheckStyleStep(item.step),
              })}
              onClick={() => handleSelectPage(item.step - 1)}
            >
              {item.step}
            </Button>
          ))}

          <div style={{ marginLeft: "8px" }}>
            <Button variant="outlined" onClick={handleNavigateNext}>
              <NavigateNext className={classes.iconNavigate} />
            </Button>
            <Button variant="outlined">
              <LastPage
                className={classes.iconNavigate}
                onClick={handleLastPage}
              />
            </Button>
          </div>
        </Grid>
      </>
    );
  };
  const btnFinishQuizCBS = () => {
    return (
      <Button variant="contained" className={classes.btnSubmit}>
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
    reportService.answerByStudent(formStudent, params.reportId).then((res) => {
      setanswer();
      setoldCurrent();
      // if(typeDelivery==="CBT"){

      // }
    });
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
                  {current + 1}/{stepMax}{" "}
                </>
              ) : (
                quiz[current]?.step
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
              {/* {typeDelivery === "CBS"
                  ? quiz[current]?.question
                  : typeDelivery === "CBT"
                  ? question
                  : null} */}
              {quiz[current]?.question}
            </Typography>
          </Paper>
        </Grid>

        <Grid container item xs={12} justify="center">
          {handleShowQuiz()}
        </Grid>
        {typeDelivery === "CBS" ? btnNavigateStepCBS() : btnSubmitCBT()}
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
                  onClick={() => history.push("/login/student")}
                >
                  Logout
                </Button>
              </IconButton>
            </Toolbar>
          </AppBar>
        </Grid>
        {waiting ? <WaitingForActivity /> : showContent()}

        {/* <Grid container item xs={12} className={classes.content}>
          
        </Grid> */}
      </Grid>
    </>
    // </div>
  );
}

///-----
