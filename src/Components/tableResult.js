import React, { useState, useEffect, forwardRef } from "react";
import {
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Clear,
  ArrowDownward,
  SaveAlt,
} from "@material-ui/icons";
import MaterialTable from "material-table";
import { makeStyles, Typography, Box, Button } from "@material-ui/core";
import { CsvBuilder } from "filefy";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  typoRowCorrect: {
    backgroundColor: "#E7F6EA",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "14px",
    textAlign: "justify",
    padding: theme.spacing(1),
  },
  typoRowIncorrect: {
    backgroundColor: "#FCE5E5",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "14px",

    padding: theme.spacing(1),
    textAlign: "justify",
  },
  typoRowClassScore: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    textAlign: "justify",
  },
}));

export default function TableResult({
  quiz,
  student,
  stepMax,
  score,
  studentMax,
}) {
  const classes = useStyles();
  const [selectedRow, setSelectedRow] = useState(null);

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
        headerStyle: {
          padding: 20,
        },
      },
      {
        title: "SCORE",
        field: "score",
        headerStyle: {
          width: 10,
          maxWidth: 20,
          padding: 10,
        },
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

  const rowsTable = (type) => {
    let row = [];
    let rowcsv = [];
    if (student?.length) {
      student.forEach((data) => {
        if (data.quizzing?.length) {
          row.push({
            fname: data.fname,
            score: `${data.countScore}/${stepMax}`,
          });
          rowcsv.push(data.fname, `${data.countScore}/${stepMax}`);

          let indexObject = row.findIndex((value) => value.fname == data.fname);
          for (let i = 0; i <= stepMax; i++) {
            // let indexObject = row.findIndex(
            //   (valueFind) => valueFind.fname == data.fname
            // );

            let result = data.quizzing.find((e) => e.step === i);
            if (result && result.result) {
              let test = `answer${i - 1}`;
              row[indexObject][test] = (
                <Typography className={classes.typoRowCorrect}>
                  {result.answer}
                </Typography>
              );
              rowcsv.push(result.answer);
              // row[indexObject][test] = `correct`;

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
              rowcsv.push(result.answer);
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
        row[indexObject][test] = (
          <Typography className={classes.typoRowClassScore}>
            {percent}%
          </Typography>
        );
      } else {
        row[indexObject][test] = (
          <Typography className={classes.typoRowClassScore}>0%</Typography>
        );
      }
    }
    if (type === "csv") {
      return rowcsv;
    }
    return row;
  };

  const handleExportCsv = () => {
    // const data = row.map((rowData) =>
    //   csvColumns.map((columnDef) => rowData[columnDef.field])
    // );

    const builder = new CsvBuilder("Report.csv");
    let row = rowsTable("csv");
    let columns = columnsTable();
    console.log(row);
    builder
      .setColumns(row)
      .addRow(["Eve", "Holt"])
      .addRows([
        ["Charles", "Morris"],
        ["Tracey", "Ramos"],
      ])
      .exportFile();
  };

  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="Score"
        style={{ width: "100%" }}
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
          exportAllData: true,
          // exportCsv: handleExportCsv(),
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
            fontSize: "15px",

            textAlign: "center",
            // color: checkColorRow(rowData) ? "#19A999" : "F5F7F8",
            // color: colorRow === rowData.tableData.id ? "#19A999" : "F5F7F8",
          }),
        }}
      />
      <Button onClick={handleExportCsv}>handleExportCsv</Button>
    </>
  );
}
