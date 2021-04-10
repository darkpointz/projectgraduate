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
import { makeStyles, Typography, Box, Button, Grid } from "@material-ui/core";
import { CsvBuilder } from "filefy";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  typoRowCorrect: {
    backgroundColor: "#E7F6EA",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "14px",
    // textAlign: "justify",
    textAlign: "center",
    padding: theme.spacing(1),
  },
  typoRowIncorrect: {
    backgroundColor: "#FCE5E5",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    borderRadius: "14px",

    padding: theme.spacing(1),
    textAlign: "center",
    // textAlign: "justify",
  },
  typoRowScore: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    padding: theme.spacing(1),
    textAlign: "center",
    // textAlign: "justify",
  },
  typoRowClassScore: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "15px",
    // textAlign: "justify",
    textAlign: "center",
  },
  btnExport: {
    borderRadius: "16px",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    backgroundColor: "#6DC8BE",
    color: "#fff",
    width: "10%",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
}));

export default function TableResult({
  quiz,
  student,
  stepMax,
  score,
  studentMax,
  report,
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

  const columnsTable = (type) => {
    let columnName = [
      {
        title: "NAME",
        field: "fname",
        headerStyle: {
          padding: 20,
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
        },
        cellStyle: {
          borderBottom: "1px solid black",
        },
      },
      {
        title: "SCORE",
        field: "score",
        headerStyle: {
          width: 10,
          maxWidth: 20,
          padding: 10,
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
        },
        cellStyle: {
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
        },
      },
    ];
    let columnCsv = ["NAME", "SCORE", ""];
    quiz.map((item, i) => {
      let step = item.step;
      columnName.push({
        title: step,
        field: "answer" + i,
        headerStyle: {
          backgroundColor: "#039be5",
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
          borderTop: "1px solid black",
        },
        cellStyle: {
          borderLeft: "1px solid black",
          borderBottom: "1px solid black",
        },
      });
      columnCsv.push(i + 1);
    });
    if (type === "csv") {
      return columnCsv;
    }
    return columnName;
  };

  const rowsTable = (type) => {
    let row = [];
    let rowCsv = [];
    if (student?.length) {
      //--ลูปทุกคน
      student.forEach((data) => {
        if (data.quizzing?.length) {
          row.push({
            fname: data.fname,
            score: (
              <Typography className={classes.typoRowScore}>
                {data.countScore}/{stepMax}
              </Typography>
            ),
            // score: `${data.countScore}/${stepMax}`,
          });
          rowCsv.push([data.fname, `${data.countScore}`]);

          let indexObject = row.findIndex((value) => value.fname == data.fname);
          for (let i = 0; i <= stepMax; i++) {
            let result = data.quizzing.find((e) => e.step === i);
            if (result && result.result) {
              //ตอบถูก
              let test = `answer${i - 1}`;
              row[indexObject][test] = (
                <Typography className={classes.typoRowCorrect}>
                  {result.answer}
                </Typography>
              );
              //add rowCsv
              rowCsv[indexObject].push(result.answer);
            } else if (result && !result.result) {
              //ตอบผิด
              let test = `answer${i - 1}`;
              row[indexObject][test] = (
                <Typography className={classes.typoRowIncorrect}>
                  {result.answer}
                </Typography>
              );
              //add rowCsv
              rowCsv[indexObject].push(result.answer);
            } else if (type === "csv") {
              //add rowCsv
              rowCsv[indexObject].push("");
            }
          }
        } else {
          row.push({
            fname: data.fname,
            answer: "",
          });
          rowCsv.push([data.fname, `0`]);
        }
      });
    }

    //--rowScore--
    row.push({ fname: "Class Total" });
    rowCsv.push(["Class Total", "", ""]);
    let indexObject = row.findIndex((value) => value.fname == "Class Total");
    for (let i = 0; i < stepMax; i++) {
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
        rowCsv[indexObject].push([`${percent}%`]);
      } else {
        row[indexObject][test] = (
          <Typography className={classes.typoRowClassScore}>0%</Typography>
        );
        rowCsv[indexObject].push([`0%`]);
      }
    }
    if (type === "csv") {
      return rowCsv;
    }
    return row;
  };

  const handleExportCsv = () => {
    const builder = new CsvBuilder("Report.csv");
    let row = rowsTable("csv");
    let columns = columnsTable("csv");
    builder.setColumns(columns).addRows(row).exportFile();
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        {report ? (
          <Grid container item xs={12} justify="flex-end" alignItems="center">
            <Button
              variant="contained"
              className={classes.btnExport}
              onClick={handleExportCsv}
            >
              <SaveAlt />
              {/* <SaveAlt style={{ marginRight: "5px" }} /> */}
              Export
            </Button>
          </Grid>
        ) : null}

        <Grid container item xs={12}>
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
              // exportButton: true,
              // exportAllData: true,
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
        </Grid>
      </Grid>
    </div>
  );
}
