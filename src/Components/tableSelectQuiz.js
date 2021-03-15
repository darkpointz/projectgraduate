import React, { useState, useEffect, forwardRef } from "react";
import { quizService } from "../Services/quizService";
import MaterialTable from "material-table";
import {
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Clear,
  ArrowDownward,
} from "@material-ui/icons";

import { makeStyles, withStyles, TableCell } from "@material-ui/core";

const useStyles = makeStyles({
  tableMaterial: {},
});

export default function TableSelectQuiz(props) {
  const { setselectQuiz, selectQuiz } = props;
  const classes = useStyles();
  const [quiz, setquiz] = useState([]);
  const [select, setselect] = useState();

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    setselect(selectQuiz);
    quizService.getAllQuiz(uId).then((res) => {
      setquiz(res);
    });
  }, []);

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
  };

  const handleSelect = (selectedRow) => {
    setselect(selectedRow);
    setselectQuiz(selectedRow);
  };

  return (
    <div>
      <MaterialTable
        icons={tableIcons}
        //className={classes.tableMaterial}
        title="Select Class"
        columns={[
          {
            title: "QuizName",
            field: "quizName",
            headerStyle: {
              fontFamily: "'Prompt', sans-serif",
              fontWeight: 500,
              fontSize: "18px",
            },
          },
          // { title: "Surname", field: "quizId" },
        ]}
        data={quiz}
        options={{
          // selection: true,
          rowStyle: (selectedRow) => {
            let selected = select && select.quizId === selectedRow.quizId;
            return {
              backgroundColor: selected ? "#6DC8BE" : "#FFF",
              color: selected ? "#e0dd1f !important" : "#000",
            };
          },
        }}
        onRowClick={(event, selectedRow) => {
          handleSelect(selectedRow);
        }}
      />
    </div>
  );
}
