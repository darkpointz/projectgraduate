import React, { useState } from "react";
import Createquiz from "../Components/createquiz";
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
import DialogSelectCreateQuiz from "../Components/dialogSelectCreateQuiz";

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
    marginBottom: "16px",
    [theme.breakpoints.down("sm")]: {
      height: "37px",
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
  paper: { backgroundColor: "#6DC8BE", flexGrow: 1 },
  inputRoot: {
    color: "inherit",
  },
  formtextfield: {
    width: "55%",
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

export default function Quiz() {
  const classes = useStyles();
  const [btnCreate, setbtnCreate] = useState(false);
  const [open, setOpen] = useState(false);

  const clickCreate = () => {
    setOpen(true);
    // setbtnCreate(!btnCreate);
  };

  const onsumit = (quizname, quiz) => {
    clickCreate();
    setbtnCreate(!btnCreate);
    setOpen(false);
    // firebase.firestore().collection("quiz").add({
    //   quizname: quizname,
    //   quiz: quiz,
    // });
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === "CN") {
      setbtnCreate(true);
    }
  };

  return (
    //--เดียวเปลี่ยนเป็นrouteแทน***
    <div className={classes.root}>
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

          <DialogSelectCreateQuiz open={open} onClose={handleClose} />
        </Grid>
      ) : (
          <div className={classes.content}>
            <Createquiz submit={onsumit} />
            <hr />
          </div>
        )}
    </div>
  );
}

// ---
// return (
//   <div className={classes.root}>
//     {!btnCreate ? (
//       <button className={classes.btn} onClick={clickCreate}>
//         createquiz
//       </button>
//     ) : (
// <div className={classes.content}>
//   <Createquiz submit={onsumit} />
//   <hr />
// </div>
//     )}
//     <DialogSelectCreate open={open} onClose={handleClose} />
//   </div>
// );
