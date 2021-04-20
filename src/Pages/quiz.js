import React, { useState, useEffect, forwardRef } from "react";
import Createquiz from "../Components/createquiz";
import { quizService } from "../Services/quizService";
import Showquiz from "../Components/showquiz";
import MaterialTable from "material-table";
import swal from "sweetalert";
import DialogSelectCreate from "../Components/dialogSelectCreate";
import TableQuiz from "../Components/tableQuiz";

import { makeStyles, Paper, Button, Typography, Grid } from "@material-ui/core";
import Cookies from "universal-cookie";
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
  const cookies = new Cookies();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [quiz, setquiz] = useState([]);
  const [path, setpath] = useState("Quizzes");

  const handleChangeHeaderxlsx = (data) => {
    let newData = [];
    console.log("data: ", data);
    // data.map((item) => {
    //   let form = {};
    //   form.stuid = item.studentid;
    //   form.fname = item.firstname;
    //   form.lname = item.lastname;
    //   newData.push(form);
    // });
    return newData;
  };

  const handleClose = (value, data) => {
    setOpen(false);
    if (value === "createNew") {
      // setbtnCreate(true);
      history.push("/createquiz/0");
    } else if (value === "import") {
      let newData = handleChangeHeaderxlsx(data);
    }
  };

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
            <Grid container item xs={12}>
              <Typography className={classes.typotitlePaper}>Quiz</Typography>
            </Grid>
            <Grid container item xs={12} style={{ marginRight: "10px" }}>
              <TableQuiz />
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <DialogSelectCreate
        open={open}
        onClose={handleClose}
        name="create quiz"
        type="quiz"
      />
      {/* </Grid> */}
    </div>
  );
}
