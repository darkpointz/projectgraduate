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
  DialogTitle,
} from "@material-ui/core";
import DialogSelectCreate from "../Components/dialogSelectCreate";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexGrow: 1,
  },
  btn: {},
  content: {
    flexGrow: 1,
  },
});

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
    // firebase.firestore().collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz,
    // });
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {!btnCreate ? (
        <button className={classes.btn} onClick={clickCreate}>
          createquiz
        </button>
      ) : (
        <div className={classes.content}>
          <Createquiz submit={onsumit} />
          <hr />
        </div>
      )}
      <DialogSelectCreate open={open} onClose={handleClose} />
    </div>
  );
}
