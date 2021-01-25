import React, { useState } from "react";
import Createquiz from "../Components/createquiz";
import Showquiz from "../Components/showquiz";
import firebase from "firebase/app";

import "firebase/firestore";

import {
  makeStyles,
  Paper,
  Button,
  Dialog,
  InputBase,
  Typography,
  Box,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import DialogSelectCreate from "../Components/dialogSelectCreate";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  btnCreate: {
    display: "flex",
    borderRadius: "20px",
    backgroundColor: "#00FF08",
    color: "white",
    height: "45px",
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      height: "37px",
    },
  },
  iconAddQuiz: {
    marginRight: "3px",
  },
  typoAddQuiz: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
  content: {
    flexGrow: 1,
  },
  paper: { backgroundColor: "#6DC8BE" },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Quiz() {
  const classes = useStyles();
  const [btnCreate, setbtnCreate] = useState(false);
  const [open, setOpen] = useState(false);

  const clickCreate = () => {
    setOpen(true);
    // setbtnCreate(!btnCreate);
  };

  const onsumit = (quizname, quiz) => {
    clickCreate();
    setbtnCreate(!btnCreate);
    // firebase.firestore().collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz,
    // });
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === "CN") {
      setbtnCreate(true);
    }
  };

  return (
    //--เดียวเปลี่ยนเป็นrouteแทน***
    <div className={classes.root}>
      {!btnCreate ? (
        <div>
          <Box display="flex" justifyContent="flex-end">
            <Button
              variant="contained"
              className={classes.btnCreate}
              onClick={() => setOpen(true)}
            >
              <Add className={classes.iconAddQuiz} />
              <Typography className={classes.typoAddQuiz}>
                Createquiz
              </Typography>
            </Button>
          </Box>
          <Paper className={classes.paper}>
            <Box display="flex" flexDirection="column">
              <Typography>Quiz</Typography>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              ></InputBase>
            </Box>
          </Paper>
          <DialogSelectCreate open={open} onClose={handleClose} />
        </div>
      ) : (
        <div className={classes.content}>
          <Createquiz submit={onsumit} />
          <hr />
        </div>
      )}
    </div>
  );
}

// ---
// return (
//   <div className={classes.root}>
//     {!btnCreate ? (
//       <button className={classes.btn} onClick={clickCreate}>
//         createquiz
//       </button>
//     ) : (
// <div className={classes.content}>
//   <Createquiz submit={onsumit} />
//   <hr />
// </div>
//     )}
//     <DialogSelectCreate open={open} onClose={handleClose} />
//   </div>
// );
