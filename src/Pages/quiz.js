import React, { useState, useEffect, forwardRef } from "react";
import Createquiz from "../Components/createquiz";
import { quizService } from "../Services/quizService";
import Showquiz from "../Components/showquiz";
import MaterialTable from "material-table";
import swal from "sweetalert";
import DialogSelectCreate from "../Components/dialogSelectCreate";
import TableQuiz from "../Components/tableQuiz";

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
} from "@material-ui/core";
import { Add, Folder } from "@material-ui/icons";

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
  btnFolders: {
    width: "85%",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-around",
    backgroundColor: "#CCECE8",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "16px",
    // color: "#E9E9E9",
  },
}));

export default function Quiz(props) {
  const { history } = props;
  const classes = useStyles();
  const [btnCreate, setbtnCreate] = useState(false);
  const [open, setOpen] = useState(false);
  const [quiz, setquiz] = useState([]);
  const [userId, setuserId] = useState();
  const [path, setpath] = useState("Quiz");

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
    if (value === "createNew") {
      // setbtnCreate(true);
      history.push("/createquiz/0");
    }
  };

  const clickFolder = (type) => {
    setpath(type);
  };

  const handleDeleteQuiz = () => {};

  return (
    //--เดียวเปลี่ยนเป็นrouteแทน***
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid container item xs={12} justify="flex-end" alignItems="center">
          <Button
            variant="contained"
            className={classes.btnCreate}
            onClick={(e) => setOpen(true)}
          >
            <Add className={classes.iconAddQuiz} />
            <Typography className={classes.typoAddQuiz}>Createquiz</Typography>
          </Button>
        </Grid>
        <Grid container item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.typotitlePaper}>Quiz</Typography>

            <Grid container item xs={12}>
              <Grid
                container
                item
                xs={2}
                direction="column"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  className={classes.btnFolders}
                  onClick={(e) => clickFolder("Quiz")}
                >
                  <Folder style={{ color: "#fff" }} />
                  Quizzes
                </Button>
                <Button
                  variant="contained"
                  className={classes.btnFolders}
                  onClick={(e) => clickFolder("QuickQuestion")}
                >
                  <Folder style={{ color: "#fff" }} />
                  Quick Question
                </Button>
              </Grid>
              <Grid container item xs={10}>
                <TableQuiz path={path} />
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
