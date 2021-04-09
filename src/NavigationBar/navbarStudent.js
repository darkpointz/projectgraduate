import React, { useState, useEffect } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";
import { createBrowserHistory } from "history";
import { useHistory, useParams } from "react-router-dom";
import LoginByUserRoomName from "../Pages/loginByUserRoomName";
import LoginByUserName from "../Pages/loginByUserName";
import firebase from "firebase/app";

import WaitingForActivity from "../Components/waitingForActivity";
import { reportService } from "../Services/reportService";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
  IconButton,
} from "@material-ui/core";

export default function NavbarStudent() {
  const classes = useStyles();
  // const history = createBrowserHistory({ forceRefresh: true });
  let history = useHistory();
  let params = useParams();
  const [report, setreport] = useState();
  const [roomPublic, setroomPublic] = useState();
  const [roomName, setroomName] = useState();

  useEffect(() => {
    let room = localStorage.getItem("RoomStudent");
    setroomName(room);
    let stuid = localStorage.getItem("stuid");
    let reportId = localStorage.getItem("ReportId");
    if (!reportId) {
      let unsubscribe;
      unsubscribe = firebase
        .firestore()
        .collection("Report")
        .where("roomName", "==", room)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (!doc.data().finish) {
              let submit = false;
              doc.data().student.find((e) => {
                if (e.stuid === stuid) {
                  submit = e.submit;
                  console.log("e ", e);
                }
              });
              console.log("e.submit: ", submit);
              if (params.room === "finish") {
                setreport();
                localStorage.removeItem("ReportId");
              }
              if (submit === false) {
                console.log(doc.data());
                setreport(doc.id);
                setroomPublic(doc.data().roomPublic);
                localStorage.setItem("ReportId", doc.id);
              }
            }
          });
        });
      return () => {
        if (unsubscribe) {
          unsubscribe();
        }
      };
    }

    // if (roomName) {
    //   reportService.getRoomTypeByStudent(roomName).then((res) => {
    //     console.log(res);
    //     if (res) {
    //       setreport(res.reportId);
    //       setroomPublic(res.roomPublic);
    //     }
    //   });
    // }
  });

  const handleSetRoom = (roomUser, roomPublic) => {
    setreport(roomUser);
    setroomPublic(roomPublic);
  };

  const handleClickLogout = () => {
    history.push("/login/student/0");
    setroomName();
    setreport();
    setroomPublic();
    localStorage.removeItem("RoomStudent");
    localStorage.removeItem("stuid");
    localStorage.removeItem("ReportId");
  };

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Grid container item xs={2}>
                <Typography
                  variant="h6"
                  className={classes.title}
                  onClick={() => history.push("/")}
                >
                  Qton
                </Typography>
              </Grid>
              <Grid container item xs={10} justify="flex-end">
                {roomName ? (
                  <Button
                    color="inherit"
                    className={classes.btn}
                    onClick={handleClickLogout}
                  >
                    Logout
                  </Button>
                ) : (
                  <Button
                    color="inherit"
                    className={classes.btn}
                    onClick={() => history.push("/login/teacher")}
                  >
                    Teacher Login
                  </Button>
                )}
              </Grid>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          container
          item
          xs={12}
          className={classes.body}
          alignItems="center"
          justify="center"
        >
          <Grid
            container
            item
            xs={12}
            justify="center"
            alignItems="center"
            direction="column"
          >
            {!report && !roomName ? (
              <LoginByUserRoomName handleSetRoom={handleSetRoom} />
            ) : !report && roomName ? (
              <WaitingForActivity colorWhite="true" />
            ) : (
              <LoginByUserName reportId={report} roomPublic={roomPublic} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
