import React, { useState, useEffect } from "react";
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

export default function DialogSelectRoomQQ() {
  const classes = useStyles();
  return <div></div>;
}
