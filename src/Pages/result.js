import React, { useState, useEffect, forwardRef } from "react";
import { reportService } from "../Services/reportService";
import firebase from "firebase/app";

import {
  makeStyles,
  CssBaseline,
  Button,
  LinearProgress,
  Typography,
  ThemeProvider,
  Grid,
  Divider,
  Box,
} from "@material-ui/core";
import MaterialTable from "material-table";

import {
  NavigateNext,
  NavigateBefore,
  GroupTwoTone,
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Clear,
  ArrowDownward,
  Check,
  SaveAlt,
  Close,
} from "@material-ui/icons";
import axios from "axios";
import ResultMC from "../Components/resultMC";
import ResultTF from "../Components/resultTF";
import ResultSA from "../Components/resultSA";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typoRoomName: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "32px",
  },
  btnStart: {
    backgroundColor: "#ffa100",
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    borderRadius: "18px",
  },
  typoStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    margin: "0 8px",
  },
  typoCountStudent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  iconNavigate: {
    fontSize: "28px",
  },
  typoRowCorrect: {
    backgroundColor: "#E7F6EA",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    padding: theme.spacing(1),
  },
  typoRowIncorrect: {
    backgroundColor: "#FCE5E5",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    padding: theme.spacing(1),
  },
  tableCBS: {
    padding: theme.spacing(1),
  },
}));

export default function Result() {
  const classes = useStyles();
  const [reportId, setreportId] = useState();
  const [typeDelivery, settypeDelivery] = useState();
  const [quiz, setquiz] = useState([]);
  const [roomName, setroomName] = useState();
  const [score, setscore] = useState([]);
  const [student, setstudent] = useState([]);
  const [studentMax, setstudentMax] = useState();
  const [current, setcurrent] = useState(0);
  const [stepMax, setstepMax] = useState();
  const [start, setstart] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const [colorRow, setcolorRow] = useState([]);

  useEffect(() => {
    reportService.resultTeacher(localStorage.getItem("liveId")).then((res) => {
      setreportId(localStorage.getItem("liveId"));
      settypeDelivery(res);
      // if (res === "CBT") {

      firebase
        .firestore()
        .collection("Report")
        .doc(localStorage.getItem("liveId"))
        .onSnapshot((doc) => {
          console.log(doc.data());
          setquiz(doc.data().quiz);
          setstepMax(doc.data().quiz.length);
          setroomName(doc.data().roomName);
          setscore(doc.data().score);
          setstudent(doc.data().student);
          setstudentMax(doc.data().student.length);
          setstart(doc.data().start);
        });
      // } else if (res === "CBT") {
      //   firebase
      //     .firestore()
      //     .collection("Report")
      //     .doc(localStorage.getItem("liveId"))
      //     .onSnapshot((doc) => {});
      // }
    });
  }, []);

  const handleShowResultCBT = () => {
    return (
      <>
        {quiz[current]?.type === "multiplechoice" ? (
          <ResultMC quiz={quiz[current]} />
        ) : quiz[current]?.type === "truefalse" ? (
          <>
            <ResultTF quiz={quiz[current]} />
          </>
        ) : quiz[current]?.type === "shortanswer" ? (
          <ResultSA quiz={quiz[current]} />
        ) : null}
      </>
    );
  };

  const countStundentJoin = () => {
    let result = student?.filter((element) => {
      return element.join === true;
    });
    return result.length;
  };

  const countStundent = () => {
    let count;
    count = score[current]?.countCorrect + score[current]?.countFail;
    return count;
  };

  const handleteacherNextStep = (newStep) => {
    const formStep = {
      oldStep: current + 1,
      newStep: newStep,
    };
    reportService.teacherNextStepCBT(reportId, formStep).then((res) => {
      if (newStep > formStep.oldStep) {
        setcurrent(current + 1);
      } else {
        setcurrent(current - 1);
      }
    });

    console.log(formStep);
  };

  const handleBtnStart = () => {
    reportService.teacherStartQuiz(reportId).then((res) => {
      console.log(res);
      setstart(true);
    });
  };

  const showNavigateStep = () => {
    return (
      <>
        <Button
          variant="outlined"
          className={classes.typoCountStudent}
          className={classes.iconNavigate}
          onClick={() => handleteacherNextStep(current)}
        >
          <NavigateBefore />
        </Button>

        <Typography className={classes.typoStep}>
          {quiz[current]?.step} / {stepMax}
        </Typography>

        <Button
          variant="outlined"
          className={classes.iconNavigate}
          onClick={() => handleteacherNextStep(current + 2)}
        >
          <NavigateNext />
        </Button>
      </>
    );
  };

  const tableIcons = {
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  };

  const columnsTable = () => {
    let columnName = [
      {
        title: "NAME",
        field: "fname",
      },
      {
        title: "SCORE",
        field: "score",
      },
    ];
    quiz.map((item, i) => {
      let step = item.step;
      columnName.push({
        title: step,
        field: "answer" + i,
        headerStyle: {
          backgroundColor: "#039be5",
        },
      });
    });
    return columnName;
  };

  const rowsTable = () => {
    let row = [];
    if (student?.length) {
      student.forEach((data) => {
        if (data.quizzing?.length) {
          row.push({
            fname: data.fname,
            score: `${data.countScore}/${stepMax}`,
          });
          let indexObject = row.findIndex((value) => value.fname == data.fname);
          for (let i = 0; i <= stepMax; i++) {
            // let indexObject = row.findIndex(
            //   (valueFind) => valueFind.fname == data.fname
            // );
            let obj = {
              id: data.stuid,
            };
            let newcolorRow;

            let result = data.quizzing.find((e) => e.step === i);
            if (result && result.result) {
              let test = `answer${i - 1}`;
              row[indexObject][test] = (
                <Typography className={classes.typoRowCorrect}>
                  {result.answer}
                </Typography>
              );
              // row[indexObject][test] = `correct`;

              newcolorRow = colorRow;
              // newcolorRow.push({ obj });
              // row[indexObject][test] = `${(<Check />)} correct`;
            } else if (result && !result.result) {
              let test = `answer${i - 1}`;
              row[indexObject][test] = (
                <Box display="flex" justify="center">
                  <Typography className={classes.typoRowIncorrect}>
                    {result.answer}
                  </Typography>
                </Box>
              );
              // row[indexObject][test] = "incorrect";
            }

            // if (data.quizzing.some((checkStep) => checkStep.step == i)) {
            //   let test = `answer${i - 1}`;
            //   row[indexObject][test] = data.quizzing[0].result;
            //   console.log(row);
            // }
          }
        } else {
          row.push({
            fname: data.fname,
            answer: "",
          });
        }
      });
    }

    //--rowScore--
    row.push({ fname: "Class Total" });
    let indexObject = row.findIndex((value) => value.fname == "Class Total");
    for (let i = 0; i <= stepMax; i++) {
      let countCorrect = score[i]?.countCorrect;
      let percent;
      let test = `answer${i}`;
      if (countCorrect > 0) {
        percent = parseInt((countCorrect / studentMax) * 100);
        row[indexObject][test] = `${percent}%`;
      } else {
        row[indexObject][test] = `${0}%`;
      }
    }
    return row;
  };

  const handleShowResultCBS = () => {
    return (
      <>
        <MaterialTable
          icons={tableIcons}
          title="Score"
          // style={{ padding: "0 8px" }}
          className={classes.tableCBS}
          columns={columnsTable()}
          // data={student}
          data={rowsTable()}
          onRowClick={(evt, selectedRow) =>
            setSelectedRow(selectedRow.tableData.id)
          }
          options={{
            search: false,
            exportButton: true,
            headerStyle: {
              backgroundColor: "#19A999",
              color: "#FFF",
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
              textAlign: "center",
            },
            rowStyle: (rowData) => ({
              backgroundColor:
                selectedRow === rowData.tableData.id ? "#F5F7F8" : "#FFF",
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 500,
              fontSize: "16px",
              // color: checkColorRow(rowData) ? "#19A999" : "F5F7F8",
              // color: colorRow === rowData.tableData.id ? "#19A999" : "F5F7F8",
            }),
          }}
        />
      </>
    );
  };

  const checkColorRow = (rowData) => {
    let result;
    console.log("rowData: ", rowData.tableData);
    result = colorRow.find((e) => e.id === rowData.tableData.id);
    // return;
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Grid container spacing={2}>
        <Grid container item xs={6}>
          <Typography className={classes.typoRoomName}>{roomName}</Typography>
        </Grid>
        <Grid container item xs={6} justify="flex-end">
          {!start ? (
            <Button
              variant="contained"
              className={classes.btnStart}
              onClick={handleBtnStart}
            >
              Start Quiz
            </Button>
          ) : (
            <Button variant="contained" className={classes.btnStart}>
              Finish Quiz
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12} container justify="center" alignItems="center">
          <Grid item xs={3} container>
            <Typography className={classes.typoCountStudent}>
              Students Answered {countStundent()} / {studentMax}
            </Typography>
          </Grid>

          <Grid item xs={8} container justify="center" alignItems="center">
            {typeDelivery === "CBT" ? showNavigateStep() : null}
          </Grid>

          <Grid item xs={1} container>
            <GroupTwoTone />
            <Typography className={classes.typoCountStudent}>
              {countStundentJoin()} / {studentMax}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} justify="center">
          {typeDelivery === "CBT"
            ? handleShowResultCBT()
            : handleShowResultCBS()}
        </Grid>
      </Grid>
    </div>
  );
}
