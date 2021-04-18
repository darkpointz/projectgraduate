import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { quizService } from "../Services/quizService";
import { useHistory } from "react-router-dom";

import {
  withStyles,
  makeStyles,
  IconButton,
  TableBody,
  TablePagination,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import swal from "sweetalert";

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
    marginRight: "10px",
    marginBottom: "10px",
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

export default function TableQuiz({ path }) {
  const classes = useStyles();
  const [quiz, setquiz] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  let history = useHistory();

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    quizService.getAllQuiz(uId).then((res) => {
      setquiz(res);
    });
  }, []);

  const handleClickEdit = (item) => {
    history.push(`/createquiz/${item.quizId}`);
    console.log(item);
  };

  const handleClickDelete = (item, index) => {
    swal({
      title: "Please Confirm",
      text: "Are you sure you want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        quizService.deleteQuizByQuizId(item.quizId).then((res) => {
          let newquiz = [...quiz];
          newquiz.splice(index, 1);
          setquiz(newquiz);
          swal("Delete room success!", {
            icon: "success",
          });
        });
      }
    });
  };

  const handleDate = (time) => {
    let date = new Date(time._seconds * 1000).toLocaleString("th-TH");
    return date;
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
              <StyledTableCell
                align="center"
                padding="checkbox"
                className={classes.TableCellHead}
              >
                Edit
              </StyledTableCell>
              <StyledTableCell
                align="center"
                padding="checkbox"
                className={classes.TableCellHead}
              >
                Delete
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {quiz &&
              quiz
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
                      {/* {item.createAt} */}
                    </TableCell>

                    <TableCell
                      align="left"
                      className={classes.TableCellContent}
                    >
                      <IconButton
                        aria-label="iconEdit"
                        onClick={() => handleClickEdit(item)}
                      >
                        <Edit className={classes.icon} />
                      </IconButton>
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.TableCellContent}
                    >
                      <IconButton
                        aria-label="iconDelete"
                        onClick={() => handleClickDelete(item, i)}
                      >
                        <Delete className={classes.icon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      {quiz ? (
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={quiz.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      ) : null}
    </div>
  );
}
