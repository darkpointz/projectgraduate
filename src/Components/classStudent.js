import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from 'axios';

import {
  makeStyles,
  IconButton,
  Button,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";

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
    fontSize: "28px",
    marginLeft: "16px",
  },
}));
export default function ClassStudent({ match }) {
  let params = useParams();
  const [room, setroom] = useState("Math")
  // const [student, setstudent] = useState([{ stuId: "01", name: "tom" }, { stuId: "02", name: "aod" }, { stuId: "03", name: "cat" }])
  const [student, setstudent] = useState([]);

  const classes = useStyles();
  const [openAddStudent, setOpenAddStudent] = useState(false);

  useEffect(() => {
    axios.get(`/getroom/${params.id}`).then(
      res => {
        console.log(res.data);
        setstudent(res.data.student)
      }
    )
  }, [])
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


      </Grid>
    </div>
  );
}
