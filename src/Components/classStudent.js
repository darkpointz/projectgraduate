import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DialogAddstudent from "../Components/dialogAddstudent";

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
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const classes = useStyles();

  useEffect(() => {
    axios.get(`/getroom/${params.id}`).then((res) => {
      setroom(res.data.roomName);
      setstudent(res.data.student);
    });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCloseAddStudent = () => {
    setOpenAddStudent(false);
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
                  Name
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
              {student
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((student) => (
                  // {student.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.TableCellContent}
                    >
                      {student.id}
                    </TableCell>
                    <TableCell
                      align="left"
                      className={classes.TableCellContent}
                    >
                      {student.name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton aria-label="iconEdit">
                        <Edit className={classes.icon} />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">
                      <IconButton aria-label="iconDelete">
                        <Delete className={classes.icon} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={student.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Grid>
      <DialogAddstudent open={openAddStudent} onClose={handleCloseAddStudent} />
    </div>
  );
}
