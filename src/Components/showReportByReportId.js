import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useParams } from "react-router-dom";
import swal from "sweetalert";

import {
  makeStyles,
  Paper,
  Grid,
  Button,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import {
  Public,
  Lock,
  AccountBox,
  Delete,
  EditTwoTone,
} from "@material-ui/icons";
import TableResult from "./tableResult";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typoQuizName: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "28px",
  },
  typoDate: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
  },
}));

export default function ShowReportByReportId() {
  const classes = useStyles();
  let params = useParams();
  const [quiz, setquiz] = useState([]);
  const [studentMax, setstudentMax] = useState();
  const [stepMax, setstepMax] = useState();
  const [quizName, setquizName] = useState();
  const [createdAt, setcreatedAt] = useState();
  //
  const [endAt, setendAt] = useState();
  //
  const [score, setscore] = useState([]);
  const [student, setstudent] = useState([]);

  useEffect(() => {
    reportService.getReportByReportId(params.reportId).then((res) => {
      console.log("res[0]: ", res[0]);
      setstudentMax(res[0].student.length);
      setquiz(res[0].quiz);
      setstepMax(res[0].quiz.length);
      setscore(res[0].score);
      setstudent(res[0].student);
      setquizName(res[0].quizName);
      setcreatedAt(res[0].createdAt._seconds);
      setendAt(res[0].method.endAt);
      console.log("res[0].method.endAt._seconds: ", res[0].method.endAt);
      console.log("res[0].createdAt._seconds: ", res[0].createdAt._seconds);
    });
  }, []);

  const handleDate = (time) => {
    let date = new Date(time * 1000).toLocaleString("th-TH");
    return date;
  };

  const test = () => {
    let date = new Date(createdAt * 1000);
    let curdate = new Date();
    let newdate = new Date(endAt);
    console.log("createdAt: ", new Date(createdAt * 1000).toISOString());
    console.log("endAt: ", new Date(endAt));
    let sum = (newdate - curdate) / 1000;
    console.log("sum: ", parseInt(sum));
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item xs={12} alignItems="center">
          <Grid container item xs={12}>
            <Grid container item xs={6}>
              <Typography className={classes.typoQuizName}>
                {quizName}
              </Typography>

              <Button onClick={test}>123</Button>
            </Grid>
            {/* <Grid container item xs={3}>
              <Typography className={classes.typoDate}>
                {handleDate(createdAt)}
              </Typography>
            </Grid> */}
            <Grid container item xs={6} justify="flex-end">
              <Typography className={classes.typoDate}>
                Date: {handleDate(createdAt)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid container item xs={12}>
          <TableResult
            quiz={quiz}
            stepMax={stepMax}
            student={student}
            score={score}
            studentMax={studentMax}
            report={true}
          />
        </Grid>
      </Grid>
    </div>
  );
}
