import React, { useState } from "react";

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
  Dialog,
} from "@material-ui/core";
import { Add, Search } from "@material-ui/icons";
import DialogCreateClass from "../Components/dialogCreateClass";
import DialogCreateClassNew from "../Components/dialogCreateClassNew";

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
    fontWeight: 500,
    fontSize: "26px",
    marginLeft: "16px",
    color: "white",
  },
}));

export default function Class() {
  const classes = useStyles();
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const [openCreateClassNew, setOpenCreateClassNew] = useState(false);
  const [room, setroom] = useState([]);
  const [btnCreate, setbtnCreate] = useState(false);

  const clickCreate = () => {
    setOpenCreateClass(true);
    // setbtnCreate(!btnCreate);
  };
  const handleCloseCreateClass = (value) => {
    setOpenCreateClass(false);
    if (value === "CN") {
      setOpenCreateClassNew(true);
    }
  };
  const handleCloseCreateClassNew = () => {
    setOpenCreateClassNew(false);
  };
  const createroom = (newroom) => {
    setOpenCreateClassNew(false);
    setroom([...room, newroom]);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column">
        <Grid item xs={12} container justify="flex-end" alignItems="center">
          <Button
            variant="contained"
            className={classes.btnCreate}
            onClick={() => setOpenCreateClass(true)}
          >
            <Add className={classes.iconAddQuiz} />
            <Typography className={classes.typoAddQuiz}>Createclass</Typography>
          </Button>
        </Grid>

        <Grid container item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.typotitlePaper}>Class</Typography>
          </Paper>
        </Grid>
        <DialogCreateClass
          open={openCreateClass}
          onClose={handleCloseCreateClass}
        />
        <DialogCreateClassNew
          open={openCreateClassNew}
          createroom={createroom}
          onClose={handleCloseCreateClassNew}
        />
      </Grid>
    </div>
  );
}
