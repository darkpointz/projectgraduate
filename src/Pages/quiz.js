import React, { useState, useEffect } from "react";
import Createquiz from "../Components/createquiz";
import { quizService } from "../Services/quizService";
import Showquiz from "../Components/showquiz";
import firebase from "firebase/app";

import "firebase/firestore";

import {
  makeStyles,
  Paper,
  Button,
  FormControl,
  InputAdornment,
  Typography,
  Box,
  TextField,
  Grid,
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
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
    fontWeight: 500,
    fontSize: "24px",
    color: "white",
    marginLeft: "16px",
    marginBottom: "12px",
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

  return (
    //--เดียวเปลี่ยนเป็นrouteแทน***
    <div className={classes.root}>
      <Grid container spacing={3} direction="column">
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