import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useHistory, useParams } from "react-router-dom";
import {
  makeStyles,
  TextField,
  Typography,
  Button,
  Box,
} from "@material-ui/core";

import "../index.css";
import Multiplechoice from "./multiplechoice";
import Truefalse from "./truefalse";
import Shortanswer from "./shortanswer";
import Showquiz from "./showquiz";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
  },
  layertitle: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
    },
  },
  btnsavequiz: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "10px",
    backgroundColor: "#42ea5e",
    color: "#ffffff",
  },

  line: {
    display: "flex",
  },
  text: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
    marginBottom: "14px",
  },
  layeraddquiz: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  groupquestion: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },

  btnMC: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#e2a073",
    color: "white",
  },
  btnTF: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#19b0b8",
    color: "white",
  },
  btnSA: {
    fontFamily: "'Prompt', sans-serif",
    marginRight: "16px",
    marginBottom: "8px",
    backgroundColor: "#f66a7a",
    color: "white",
  },
}));

export default function CreateQuickQuestion() {
  let history = useHistory();
  let params = useParams();
  return <div className={classes.root}></div>;
}
