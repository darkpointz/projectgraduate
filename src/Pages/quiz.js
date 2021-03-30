import React, { useState, useEffect, forwardRef } from "react";
import Createquiz from "../Components/createquiz";
import { quizService } from "../Services/quizService";
import Showquiz from "../Components/showquiz";
import firebase from "firebase/app";
import MaterialTable from "material-table";

import "firebase/firestore";

import {
  makeStyles,
  Paper,
  Button,
  FormControl,
  InputAdornment,
  Typography,
  withStyles,
  TextField,
  Grid,
  Table,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  TablePagination,
} from "@material-ui/core";
import {
  Add,
  Search,
  FirstPage,
  LastPage,
  ChevronLeft,
  ChevronRight,
  Clear,
  ArrowDownward,
  SaveAlt,
} from "@material-ui/icons";
import DialogSelectCreate from "../Components/dialogSelectCreate";

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
  paper: {
    backgroundColor: "#6DC8BE",
    flexGrow: 1,
    paddingTop: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "6px",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  formtextfield: {
    width: "55%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
  },
  textfieldSearch: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
  typotitlePaper: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "36px",
    color: "white",
    marginLeft: "16px",
    marginBottom: "12px",
  },
  tableCBS: {
    width: "100%",
  },
}));

export default function Quiz(props) {
  const { history } = props;
  const classes = useStyles();
  const [btnCreate, setbtnCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [quiz, setquiz] = useState([]);
  const [userId, setuserId] = useState();

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    quizService.getAllQuiz(uId).then((res) => {
      setquiz(res);
      setuserId(uId);
    });
  }, []);

  const clickCreate = () => {
    setOpen(true);
    // setbtnCreate(!btnCreate);
  };

  const onsumit = (quizname, quiz) => {
    // clickCreate();
    setbtnCreate(!btnCreate);
    // firebase.firestore().collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz,
    // });
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === "CN") {
      // setbtnCreate(true);
      history.push("/createquiz");
    }
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

  const columnsTable = () => {};

  const rowsTable = () => {};

  return (
    //--เดียวเปลี่ยนเป็นrouteแทน***
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid container item xs={12} justify="flex-end" alignItems="center">
          <Button
            variant="contained"
            className={classes.btnCreate}
            onClick={() => setOpen(true)}
          >
            <Add className={classes.iconAddQuiz} />
            <Typography className={classes.typoAddQuiz}>Createquiz</Typography>
          </Button>
        </Grid>
        <Grid container item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.typotitlePaper}>Quiz</Typography>

            <Grid container item xs={12}>
              <Grid container item xs={4} direction="column">
                <Button variant="contained">ss</Button>
              </Grid>
              <Grid container item xs={8}>
                <MaterialTable
                  icons={tableIcons}
                  title="Score"
                  // className={classes.tableCBS}
                  style={{ width: "100%", backgroundColor: "#A8DCD7" }}
                  columns={columnsTable()}
                  data={rowsTable()}
                  options={{
                    search: false,
                    exportButton: true,
                    exportAllData: true,
                    //   exportCsv: handleExportCsv,
                    headerStyle: {
                      backgroundColor: "#19A999",
                      color: "#FFF",
                      fontFamily: "'Prompt', sans-serif",
                      fontWeight: 500,
                      fontSize: "18px",
                      textAlign: "center",
                    },
                    rowStyle: (rowData) => ({
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
          </Paper>
        </Grid>
      </Grid>

      <DialogSelectCreate
        open={open}
        onClose={handleClose}
        name="create quiz"
      />
      {/* </Grid> */}
    </div>
  );
}
//----
{
  /* <div className={classes.root}>
      {!btnCreate ? (
        <Grid container spacing={3} direction="column">
          <Grid container item xs={12} justify="flex-end" alignItems="center">
            <Button
              variant="contained"
              className={classes.btnCreate}
              onClick={() => setOpen(true)}
            >
              <Add className={classes.iconAddQuiz} />
              <Typography className={classes.typoAddQuiz}>
                Createquiz
              </Typography>
            </Button>
          </Grid>
          <Grid container item xs={12}>
            <Paper className={classes.paper}>
              <Typography className={classes.typotitlePaper}>Quiz</Typography>
              <FormControl className={classes.formtextfield}>
                <TextField
                  classes={classes.textfieldSearch}
                  id="outlined-basic"
                  label="Search"
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <Search />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>
              </FormControl>
            </Paper>
          </Grid>

          <DialogSelectCreate
            open={open}
            onClose={handleClose}
            name="create quiz"
          />
        </Grid>
      ) : (
        <div className={classes.content}>
          <Createquiz submit={onsumit} />
          <hr />
        </div>
      )}
    </div> */
}
