import React, { useState, useEffect } from "react";
import { reportService } from "../Services/reportService";
import { useHistory } from "react-router-dom";

import {
  withStyles,
  makeStyles,
  IconButton,
  Button,
  TableBody,
  Typography,
  TablePagination,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { Add, Delete, Edit, Search } from "@material-ui/icons";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#A8DCD7",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: "0px 10px 10px",
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
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
  TableCellContent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    backgroundColor: "#A8DCD7",
  },
  icon: {
    color: "black",
  },
  TableCellHead: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "20px",
    position: "sticky",
    color: "#fff",
  },
  typotitlePaper: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "28px",
    marginLeft: "16px",
  },
  table: {
    position: "relative",
    marginRight: "10px",
  },
}));

export default function TableReport() {
  const classes = useStyles();
  const [report, setquiz] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let history = useHistory();
  useEffect(() => {
    const uId = localStorage.getItem("userId");
    reportService.getAllReport(uId).then((res) => {
      setquiz(res);
      console.log(res);
    });
  }, []);

  const handleDate = (time) => {
    let date = time.slice(0, 10);
    return date;
  };

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow className={classes.tableRow}>
              <StyledTableCell className={classes.TableCellHead}>
                Name
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.TableCellHead}>
                Date
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.TableCellHead}>
                Room
              </StyledTableCell>
              <StyledTableCell align="center" className={classes.TableCellHead}>
                Type
              </StyledTableCell>
              <StyledTableCell
                align="left"
                padding="checkbox"
                className={classes.TableCellHead}
              >
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report &&
              report
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((item, i) => (
                  <TableRow key={item.quizId}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.TableCellContent}
                    >
                      {item.quizName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.TableCellContent}
                    >
                      {handleDate(item.createdAt)}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.TableCellContent}
                    >
                      {item.roomName}
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.TableCellContent}
                    >
                      {item.type}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.TableCellContent}
                    >
                      <IconButton
                        aria-label="iconDelete"
                        // onClick={() => handleClickDelete(item, i)}
                      >
                        <Delete className={classes.icon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
