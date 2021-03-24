import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { createBrowserHistory } from "history";

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
}));

export default function LanunchStu() {
  const classes = useStyles();
  const [quiz, setquiz] = useState([]);
  const [current, setcurrent] = useState(0);
  const [roomName, setroomName] = useState();
  const [question, setquestion] = useState();
  const [typeDelivery, settypeDelivery] = useState();

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
    console.log(formStudent);
    reportService.getQuizByStudent(formStudent).then((res) => {
      if (res === "CBT") {
        firebase
          .firestore()
          .collection("Report")
          .doc(params.reportId)
          .onSnapshot((doc) => {
            let newQuiz = [];
            doc.data().quiz.forEach((data) => {
              if (data.active === true) {
                console.log(data.question);
                setquestion(data.question);
                newQuiz.push(data);
                setquiz(newQuiz);
              } else if (data.active === false) {
                setquiz(newQuiz);
              }
            });
          });
        settypeDelivery("CBT");
      } else {
        setquiz(res.quizStudent);
        setroomName(res.roomName);
        setstepMax(res.stepMax);
        settypeDelivery("CBS");
      }
    });
  }, []);

  const handleShowQuiz = () => {
    return (
      <>
        {/* {console.log(quiz[current])} */}
        {quiz[current]?.type === "multiplechoice" ? (
          <LiveMC quiz={quiz[current]} saveAnswerCBS={saveAnswerCBS} />
        ) : quiz[current]?.type === "truefalse" ? (
          <LiveTF quiz={quiz[current]} saveAnswerCBS={saveAnswerCBS} />
        ) : quiz[current]?.type === "shortanswer" ? (
          <LiveSA quiz={quiz[current]} saveAnswerCBS={saveAnswerCBS} />
        ) : null}
      </>
    );
  };

  const handleFirstPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswerCBS();
    }

    setcurrent(0);
    setpage(0);
    setmaxPage(5);
    setmid(2);
  };

  const handleLastPage = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswerCBS();
    }

    setcurrent(stepMax - 1);
    setpage(stepMax - 5);
    setmaxPage(stepMax);
    setmid(stepMax - 3);
  };

  const handleNavigateNext = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswerCBS();
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
      console.log("cuure: ", current);
      setmid(current + 1);
    }
  };

  const handleNavigateBefore = () => {
    //ส่งข้อสอบ
    if (answer) {
      submitAnswerCBS();
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
      submitAnswerCBS();
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

  const btnNavigateStepCBS = () => {
    return (
      <>
        <Grid container item xs={12} justify="center">
          <Button variant="outlined" onClick={handleFirstPage}>
            <FirstPage className={classes.iconNavigate} />
          </Button>
          <Button variant="outlined" onClick={handleNavigateBefore}>
            <NavigateBefore className={classes.iconNavigate} />
          </Button>

          {quiz.slice(page, maxPage).map((item, index) => (
            <Button
              variant="outlined"
              onClick={() => handleSelectPage(item.step - 1)}
            >
              {item.step}
            </Button>
          ))}

          <Button variant="outlined" onClick={handleNavigateNext}>
            <NavigateNext className={classes.iconNavigate} />
          </Button>
          <Button variant="outlined">
            <LastPage
              className={classes.iconNavigate}
              onClick={handleLastPage}
            />
          </Button>
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
          <Button variant="contained" className={classes.btnSubmit}>
            Submit answer
          </Button>
        </Grid>
      </>
    );
  };

  const saveAnswerCBS = (step, answer) => {
    console.log("answer: ", answer);
    setanswer(answer);
    setoldCurrent(step);
  };

  const submitAnswerCBS = () => {
    const formStudent = {
      stuid: params.stuid,
      step: oldCurrent,
      answer: answer,
    };
    console.log("answersdfsdfsdf: ", formStudent);
    reportService.answerByStudent(formStudent, params.reportId).then((res) => {
      console.log("resresres: ", res);
      setanswer();
      setoldCurrent();
    });
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
                {current + 1} / {stepMax}
              </Typography>
            </Grid>
            <Grid container item xs={7} justify="center">
              {typeDelivery === "CBS" ? btnFinishQuizCBS() : null}
            </Grid>
          </Grid>
          <Grid container item xs={12} justify="center" alignItems="center">
            <Paper className={classes.paperQuestion}>
              <Typography className={classes.typoQuestion}>
                {/* {
                  "เช้าวันที่ 24 มี.ค. ชาวบ้านที่หมู่บ้านแม่สามแลบ แจ้งมาว่า เมื่อคืนประมาณเที่ยงคืน ได้มีรถบรรทุก 4 คัน เข้ามาในหมู่บ้านแม่สามแลบ จากนั้นมีรถกระบะพร้อมคนกลุ่มหนึ่งลงไปขนข้าว 700 กระสอบและเสบียง รวมถึงน้ำมัน ของทหารเมียนมาที่กองไว้ท่าเรือแม่สามแลบ ริมแม่น้ำสาละวิน อ.สบเมย จ.แม่ฮ่องสอน ย้ายมาใส่รถบรรทุกโดยใช้เวลาเกือบ 4 ชั่วโมง จึงเสร็จสิ้น คาดว่านำกลับเข้าเมียนมาทางด่าน อ.แม่สอด จ.ตาก"
                } */}
                {quiz[current]?.question}
              </Typography>
            </Paper>
          </Grid>

          <Grid container item xs={12} justify="center">
            {handleShowQuiz()}
          </Grid>
          {typeDelivery === "CBS" ? btnNavigateStepCBS() : btnSubmitCBT()}
        </Grid>
      </Grid>
    </>
    // </div>
  );
}

///-----
