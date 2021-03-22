import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import { createBrowserHistory } from "history";

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
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { ExitToApp } from "@material-ui/icons";
import LiveMC from "../Components/liveMC";
import LiveTF from "../Components/liveTF";
import LiveSA from "../Components/liveSA";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
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
    fontSize: "30px",
  },
  btnSubmit: {
    backgroundColor: "#ffa100",
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
}));

export default function LanunchStu() {
  const classes = useStyles();
  // const [state, setstate] = useState();
  // let params = useParams();
  // useEffect(() => {
  // firebase
  //   .firestore()
  //   .collection("Report")
  //   .doc(params.reportId)
  //   .onSnapshot((doc) => {
  //     doc.data().quiz.forEach((data) => {
  //       if (data.active === true) {
  //         console.log("Current data: ", data);
  //       }
  //     });
  //     // console.log("Current data: ", doc.data().quiz);
  //   });
  // }, []);
  // return <div></div>;

  const [quiz, setquiz] = useState([]);
  const [step, setstep] = useState(1);
  const [current, setcurrent] = useState(0);
  const [stepMax, setstepMax] = useState();
  const [roomName, setroomName] = useState();
  const [question, setquestion] = useState();
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
            setquestion();
            doc.data().quiz.forEach((data) => {
              if (data.active === true) {
                setquestion(data.question);
                console.log("Current data---------------: ");
                console.log("Current data: ", question);
                setquiz(data);
              }
            });
          });
      } else {
        setquiz(res.quizStudent);
        setroomName(res.roomName);
        setstepMax(res.stepMax);
        console.log(res);
      }
    });
  }, []);

  const handleShowQuiz = () => {
    return (
      <>
        {quiz[current]?.type === "multiplechoice" ? (
          <LiveMC quiz={quiz[current]} />
        ) : quiz[current]?.type === "truefalse" ? (
          <LiveTF quiz={quiz[current]} />
        ) : quiz[current]?.type === "shortanswer" ? (
          <LiveSA quiz={quiz[current]} />
        ) : null}
      </>
    );

    // console.log(quiz[0]);
    // current
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={5}>
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
        <Grid container item xs={12} alignItems="center">
          <Grid container item xs={6} justify="center">
            <Typography className={classes.typoStep}>
              {step} / {stepMax}
            </Typography>
          </Grid>
          <Grid container item xs={6} justify="center">
            <Button variant="contained" className={classes.btnSubmit}>
              Submit answer
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} justify="center" alignItems="center">
          {handleShowQuiz()}
          {/* {console.log(quiz[1].question)} */}
          {/* <LiveMC />
          <LiveTF />
          <LiveSA /> */}
        </Grid>
      </Grid>
    </div>
  );
}

///-----
