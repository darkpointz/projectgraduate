import React, { useState, useEffect } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";
import LoginByUserRoomName from "../Pages/loginByUserRoomName";
import LoginByUserName from "../Pages/loginByUserName";
import firebase from "firebase/app";

import { reportService } from "../Services/reportService";
import {
  AppBar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography,
  Button,
  ThemeProvider,
} from "@material-ui/core";

export default function NavbarStudent() {
  const classes = useStyles();
  // const history = createBrowserHistory({ forceRefresh: true });
  let history = useHistory();
  const [report, setreport] = useState();
  const [roomPublic, setroomPublic] = useState();

  useEffect(() => {
    let roomName = localStorage.getItem("RoomStudent");
    let stuid = localStorage.getItem("stuid");
    let reportId = localStorage.getItem("ReportId");
    if (!reportId) {
      let unsubscribe;
      unsubscribe = firebase
        .firestore()
        .collection("Report")
        .where("roomName", "==", roomName)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            if (!doc.data().finish) {
              let submit;
              doc.data().student.find((e) => {
                if (e.stuid === stuid) {
                  submit = e.submit;
                }
              });
              console.log("e.submit: ", submit);
              if (submit === false) {
                setreport(doc.id);
                setroomPublic(doc.data().roomPublic);
                localStorage.setItem("ReportId", doc.id);
              }
              console.log("---");
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

  return (
    <ThemeProvider theme={useTheme}>
      <CssBaseline />
      <Grid container className={classes.root}>
        <Grid container item xs={12} className={classes.GridAppBar}>
          <AppBar position="sticky" elevation={0} className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6" className={classes.title}>
                Qton
              </Typography>
              <Button
                color="inherit"
                className={classes.btn}
                onClick={() => history.push("/login/teacher")}
              >
                Teacher Login
              </Button>
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
            {!report ? (
              <LoginByUserRoomName handleSetRoom={handleSetRoom} />
            ) : (
              <LoginByUserName reportId={report} roomPublic={roomPublic} />
            )}
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
