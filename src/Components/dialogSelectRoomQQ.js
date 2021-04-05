import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Paper,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
import { Close, ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import { reportService } from "../Services/reportService";
import TableSelectClass from "./tableSelectClass";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  gridPaper: {
    marginTop: "12px",
  },
  gridRowBtn: { marginTop: "12px" },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "28px",
    marginLeft: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "22px",
    },
  },
  typoPaperTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
    marginLeft: "12px",
    marginTop: "14px",
  },
  closeDialog: {
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  },
}));

export default function DialogSelectRoomQQ({ open, onClose, typeQQ }) {
  let history = useHistory();
  const classes = useStyles();
  const [selectClass, setselectClass] = useState();
  const [activeStep, setActiveStep] = useState(0);

  const handleCloseDialog = () => {
    setselectClass();
    onClose();
  };

  const handlFinish = () => {
    //กรอกครบ
    const uId = localStorage.getItem("userId");
    const formReport = {
      selectClass: selectClass.roomId,
      selectMethodQuiz: typeQQ,
      roomPublic: selectClass.roomPublic,
      roomName: selectClass.roomName,
    };
    if (typeQQ === "QQMC") {
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
    } else if (typeQQ === "QQTF") {
      formReport.quiz = [
        {
          type: "truefalse",
          active: false,
          question: "",
          step: 1,
          correct: "",
        },
      ];
    } else if (typeQQ === "QQSA") {
      formReport.quiz = [
        {
          type: "truefalse",
          active: false,
          question: "",
          step: 1,
          correct: [],
        },
      ];
    }
    console.log(formReport);
    reportService.insertReportQQ(uId, formReport).then((res) => {
      console.log("resss: ", res);
      history.push("/result");
      // if (res) {
      //   <Link to={`/result`} />;
      // }

      localStorage.setItem("liveId", res);
    });
    onClose();
    setActiveStep(0);
  };

  const handleSetSelectClass = (selectclass) => {
    setselectClass(selectclass);
  };

  const getContentByactiveStep = () => {
    return (
      <TableSelectClass
        selectClass={selectClass}
        setselectClass={handleSetSelectClass}
      />
    );
  };

  const checkDisabledBtn = () => {
    return selectClass ? false : true;
  };

  return (
    <div>
      <Dialog open={open} fullWidth={true}>
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12} container alignItems="center">
              <Grid item xs={11} container justify="center">
                <Typography className={classes.typoTitle}>
                  Launch Quiz
                </Typography>
              </Grid>
              <Grid item xs={1} container justify="flex-end">
                <Button
                  className={classes.closeDialog}
                  onClick={handleCloseDialog}
                >
                  <Close />
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12} className={classes.gridPaper}>
              <Paper elevation={2}>
                <Grid item xs={12}>
                  {/* <Typography className={classes.typoPaperTitle}>
                  {getStepContent(activeStep)}
                </Typography> */}
                </Grid>
                <Grid item xs={12}>
                  {getContentByactiveStep()}
                </Grid>
              </Paper>
            </Grid>

            <Grid item xs={12} container className={classes.gridRowBtn}>
              <Grid item xs={12} container justify="flex-end">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={checkDisabledBtn()}
                  onClick={handlFinish}
                >
                  Finish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
