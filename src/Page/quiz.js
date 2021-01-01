import React, { useState } from "react";
import Createquiz from "../Components/createquiz";
import Showquiz from "../Components/showquiz";
import firebase from "firebase/app";
import "firebase/firestore";
import { makeStyles } from "@material-ui/core";

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

  const clickCreate = () => {
    setbtnCreate(!btnCreate);
  };

  const onsumit = (quizname, quiz) => {
    clickCreate();
    // firebase.firestore().collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz,
    // });
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
    </div>
  );
}
