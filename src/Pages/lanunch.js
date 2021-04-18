import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { reportService } from "../Services/reportService";

import {
  makeStyles,
  IconButton,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
} from "@material-ui/core";
import { Person, People, DoubleArrowRounded } from "@material-ui/icons";
import DialogSelectSetting from "../Components/dialogSelectSetting";
import swal from "sweetalert";
import DialogSelectRoomQQ from "../Components/dialogSelectRoomQQ";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  paperClassic: {
    backgroundColor: "#6DC8BE",
    width: "200px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "18px",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
  },
  icon: {
    color: "white",
    fontSize: "90px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      fontSize: "70px",
    },
  },
  typolabel: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
  },
  divider: {
    marginTop: "24px",
  },
  typoQuickQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
  },
  paperQQMC: {
    backgroundColor: "#e2a073",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
    cursor: "pointer",
  },
  paperQQTF: {
    backgroundColor: "#19b0b8",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  paperQQSA: {
    backgroundColor: "#f66a7a",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  typoQQicon: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "36px",
    marginTop: "6px",
  },
  typoQQlabel: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
    marginBottom: "6px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  iconButton: {
    "&:hover": {
      borderRadius: "20px",
    },
    transition: "default",
  },
}));

export default function Lanunch() {
  const classes = useStyles();
  const [openDialogLanunch, setopenDialogLanunch] = useState(false);
  let history = useHistory();

  const handleCloseDialogLanunch = () => {
    setopenDialogLanunch(false);
  };

  const handleBtnLanunch = () => {
    let liveId = localStorage.getItem("liveId");
    let roomName = localStorage.getItem("RoomName");
    console.log(roomName);
    if (liveId) {
      swal("Error!", "You should finish your current activity first!", "error");
    } else if (!roomName) {
      swal("Error!", "You should select class!", "error");
    } else {
      setopenDialogLanunch(true);
    }
  };

  const handleQuickQuestion = (type) => {
    let liveId = localStorage.getItem("liveId");
    let roomName = localStorage.getItem("RoomName");
    if (liveId) {
      swal("Error!", "You should finish your current activity first!", "error");
    } else if (!roomName) {
      swal("Error!", "You should select class!", "error");
    } else {
      //สร้าง
      const uId = localStorage.getItem("userId");
      const roomName = localStorage.getItem("RoomName");
      const formReport = {
        // selectClass: selectClass.roomId,
        selectMethodQuiz: type,
        // roomPublic: selectClass.roomPublic,
        roomName: roomName,
      };
      if (type === "QQMC") {
        formReport.quiz = [
          {
            type: "multiplechoice",
            choice: ["", "", "", "", ""],
            active: false,
            question: "",
            step: 1,
            correct: [],
          },
        ];
      } else if (type === "QQTF") {
        formReport.quiz = [
          {
            type: "truefalse",
            active: false,
            question: "",
            step: 1,
            correct: "",
          },
        ];
      } else if (type === "QQSA") {
        formReport.quiz = [
          {
            type: "shortanswer",
            active: false,
            question: "",
            step: 1,
            correct: [],
          },
        ];
      }
      console.log("formReport: ", formReport);
      reportService.insertReportQQ(uId, formReport).then((res) => {
        console.log("resss: ", res);
        history.push("/result");
        // if (res) {
        //   <Link to={`/result`} />;
        // }

        localStorage.setItem("liveId", res);
      });
    }
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} container justify="center">
          <IconButton className={classes.iconButton} onClick={handleBtnLanunch}>
            <Paper className={classes.paperClassic}>
              <DoubleArrowRounded className={classes.icon} />
              <Typography className={classes.typolabel}>Start</Typography>
            </Paper>
          </IconButton>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12} container justify="center">
          <Typography className={classes.typoQuickQuestion}>
            Quick Question
          </Typography>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4} container justify="center">
            <IconButton
              className={classes.iconButton}
              onClick={() => handleQuickQuestion("QQMC")}
            >
              <Paper className={classes.paperQQMC}>
                <Typography className={classes.typoQQicon}>MC</Typography>
                <Typography className={classes.typoQQlabel}>
                  Multiplechoice
                </Typography>
              </Paper>
            </IconButton>
          </Grid>
          <Grid item xs={4} container justify="center">
            <IconButton
              className={classes.iconButton}
              onClick={() => handleQuickQuestion("QQTF")}
            >
              <Paper className={classes.paperQQTF}>
                <Typography className={classes.typoQQicon}>TF</Typography>
                <Typography className={classes.typoQQlabel}>
                  Truefalse
                </Typography>
              </Paper>
            </IconButton>
          </Grid>
          <Grid item xs={4} container justify="center">
            <IconButton
              className={classes.iconButton}
              onClick={() => handleQuickQuestion("QQSA")}
            >
              <Paper className={classes.paperQQSA}>
                <Typography className={classes.typoQQicon}>SA</Typography>
                <Typography className={classes.typoQQlabel}>
                  ShortAnswer
                </Typography>
              </Paper>
            </IconButton>
          </Grid>
        </Grid>
        <DialogSelectSetting
          open={openDialogLanunch}
          onClose={handleCloseDialogLanunch}
        />
      </Grid>
    </div>
  );
}
