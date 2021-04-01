import React, { useState, useEffect } from "react";
import TableSelectClass from "./tableSelectClass";
import { reportService } from "../Services/reportService";
import { createBrowserHistory } from "history";
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
import TableSelectQuiz from "./tableSelectQuiz";
import SelectMethodQuiz from "./selectMethodQuiz";

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

export default function DialogSelectSetting(props) {
  const classes = useStyles();
  const { open, onClose, confirm } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [selectClass, setselectClass] = useState();
  const [selectQuiz, setselectQuiz] = useState();
  const [selectMethodQuiztf, setselectMethodQuiztf] = useState(false);
  const [selectMethodQuiz, setselectMethodQuiz] = useState({
    delivery: "",
    SQ: false,
    SA: false,
    SADA: false,
    SAAA: false,
    // time: false,
  });
  let history = useHistory();

  const steps = [
    "Select Class",
    "Select Quiz",
    "Setting and Choose Delivery Method",
  ];

  const handleCloseDialog = () => {
    setselectClass();
    setselectQuiz();
    onClose();
  };

  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return "Select Class";
      case 1:
        return "Select Quiz";
      case 2:
        return "Setting and Choose Delivery Method";
      default:
        return "Unknown stepIndex";
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      //กรอกครบ
      const uId = localStorage.getItem("userId");
      const formReport = {
        selectClass: selectClass.roomId,
        selectQuiz: selectQuiz.quizId,
        selectMethodQuiz: selectMethodQuiz,
        quiz: selectQuiz.quiz,
        quizName: selectQuiz.quizName,
        roomPublic: selectClass.roomPublic,
        roomName: selectClass.roomName,
      };
      console.log(formReport);
      reportService.insertReport(uId, formReport).then((res) => {
        console.log("resss: ", res);
        history.push("/result");
        // if (res) {
        //   <Link to={`/result`} />;
        // }

        localStorage.setItem("liveId", res);
      });
      confirm();
      setActiveStep(0);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSetSelectClass = (selectclass) => {
    setselectClass(selectclass);
  };
  const handleSetSelectQuiz = (selectquiz) => {
    setselectQuiz(selectquiz);
  };

  const handleSetMethodQuiz = (selectMethodQuiz) => {
    setselectMethodQuiztf(true);
    setselectMethodQuiz(selectMethodQuiz);
  };

  const getContentByactiveStep = () => {
    switch (activeStep) {
      case 0:
        return (
          <TableSelectClass
            selectClass={selectClass}
            setselectClass={handleSetSelectClass}
          />
        );
      case 1:
        return (
          <TableSelectQuiz
            selectQuiz={selectQuiz}
            setselectQuiz={handleSetSelectQuiz}
          />
        );
      case 2:
        return (
          <SelectMethodQuiz
            selectMethodQuiz={selectMethodQuiz}
            setselectMethodQuiz={handleSetMethodQuiz}
          />
        );
      default:
        return "Unknown stepIndex";
    }
  };

  const checkDisabledBtn = () => {
    switch (activeStep) {
      case 0:
        return selectClass ? false : true;
      case 1:
        return selectQuiz ? false : true;
      case 2:
        return selectMethodQuiztf ? false : true;
      default:
        return true;
    }
  };

  return (
    <Dialog open={open} fullWidth={true}>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={12} container alignItems="center">
            <Grid item xs={11} container justify="center">
              <Typography className={classes.typoTitle}>Launch Quiz</Typography>
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

          <Grid item xs={12}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
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

          {/* <DialogTitle id="simple-dialog-title">{`Select a  method`}</DialogTitle> */}
          <Grid item xs={12} container className={classes.gridRowBtn}>
            <Grid item xs={6}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                <ArrowBackIos />
                Back
              </Button>
            </Grid>
            <Grid item xs={6} container justify="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                disabled={checkDisabledBtn()}
              >
                {activeStep === steps.length - 1 ? (
                  "Finish"
                ) : (
                  <>
                    Next
                    <ArrowForwardIos />
                  </>
                )}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
