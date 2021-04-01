import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { classService } from "../Services/classService";
import axios from "axios";
import DialogSelectCreate from "../Components/dialogSelectCreate";
import DialogManualAddstudent from "./dialogManualAddStudent";

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

import { Add, Delete, Edit } from "@material-ui/icons";
import DialogEditname from "./dialogEditname";
import DialogDelete from "./dialogDelete";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#6DC9BE",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  btnCreate: {
    display: "flex",
    borderRadius: "20px",
    backgroundColor: "#42ea5e",
    color: "white",
    height: "45px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "37px",
      marginBottom: "0",
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
  TableCellContent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 400,
    fontSize: "16px",
  },
  icon: {
    color: "black",
  },
  TableCellHead: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
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
  },
}));
export default function ClassStudent({ match }) {
  let params = useParams();
  const [room, setroom] = useState();
  const [student, setstudent] = useState([]);
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [openDialog, setopenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openEdit, setopenEdit] = useState(false);
  const [openDelete, setopenDelete] = useState(false);
  const [index, setindex] = useState();

  const classes = useStyles();

  useEffect(() => {
    classService.getRoomById(params.id).then((res) => {
      setroom(res.room.roomName);
      setstudent(res.room.student);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseAddStudent = (value) => {
    setOpenAddStudent(false);
    if (value === "CN") {
      setopenDialog(true);
    }
  };

  const handleSavenewstudent = (newstudent) => {
    setstudent(student.concat(newstudent));
    const formStudent = {
      student: newstudent,
    };
    console.log(formStudent);
    axios
      .put(`/room/insertStudentByRoomId/${params.id}`, formStudent)
      .then((res) => {
        console.log(res);
      });
    setopenDialog(false);
  };

  const handleCloseManualAdd = () => {
    setopenDialog(false);
    setOpenAddStudent(false);
  };

  const handleCloseEdit = () => {
    setopenEdit(false);
  };

  const handleClickDelete = (i) => {
    setindex(i);
    setopenDelete(true);
  };

  const handleConfirmdelete = () => {
    setopenDelete(false);
    handleDeleteStudent();
  };

  const handleCanceldelete = () => {
    setopenDelete(false);
  };

  const handleDeleteStudent = () => {
    const list = [...student];
    axios
      .delete(
        `/room/deleteStudentByRoomId/${params.id}/${student[index].stuid}`
      )
      .then((res) => {
        console.log(res);
        list.splice(index, 1);
        setstudent(list);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column">
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="space-between"
        >
          <Typography className={classes.typotitlePaper}>{room}</Typography>
          <Button
            variant="contained"
            className={classes.btnCreate}
            onClick={() => setOpenAddStudent(true)}
          >
            <Add className={classes.iconAddQuiz} />
            <Typography className={classes.typoAddQuiz}>AddStudent</Typography>
          </Button>
        </Grid>
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            aria-label="simple table"
            stickyHeader
          >
            <TableHead>
              <TableRow className={classes.tableRow}>
                <StyledTableCell className={classes.TableCellHead}>
                  ID Student
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.TableCellHead}>
                  First Name
                </StyledTableCell>
                <StyledTableCell align="left" className={classes.TableCellHead}>
                  Last Name
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
              {student &&
                student
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student, i) => (
                    <TableRow key={student.stuid}>
                      <TableCell
                        component="th"
                        scope="row"
                        className={classes.TableCellContent}
                      >
                        {student.stuid}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.TableCellContent}
                      >
                        {student.fname}
                      </TableCell>
                      <TableCell
                        align="left"
                        className={classes.TableCellContent}
                      >
                        {student.lname}
                      </TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="iconEdit"
                          onClick={() => setopenEdit(true)}
                        >
                          <Edit className={classes.icon} />
                        </IconButton>
                      </TableCell>
                      <TableCell align="left">
                        <IconButton
                          aria-label="iconDelete"
                          onClick={() => handleClickDelete(i)}
                        >
                          <Delete className={classes.icon} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        {student ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={student.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        ) : null}
      </Grid>
      <DialogSelectCreate
        open={openAddStudent}
        onClose={handleCloseAddStudent}
        name="add student"
      />
      <DialogManualAddstudent
        open={openDialog}
        onClose={handleCloseManualAdd}
        saveNewstudent={handleSavenewstudent}
      />
      <DialogEditname
        open={openEdit}
        onClose={handleCloseEdit}
        saveNewstudent={handleSavenewstudent}
      />
      <DialogDelete
        open={openDelete}
        confirm={handleConfirmdelete}
        onClose={handleCanceldelete}
      />
    </div>
  );
}
