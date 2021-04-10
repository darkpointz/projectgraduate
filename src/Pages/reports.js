import React, { useState, useEffect, forwardRef } from "react";
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
import { quizService } from "../Services/quizService";
import TableReport from "../Components/tableReport";
import { firebaseConfig } from "../Auth/firebase";

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
  typotitlePaper: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "28px",
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

export default function Reports() {
  const classes = useStyles();

  const handleDownload = async () => {
    // const storageRef = firebaseConfig.storage().ref();
    // const fileRef = storageRef.child("templateStudent.csv");
    // fileRef.getDownloadURL();
    const storage = firebaseConfig.storage();
    const storageRef = storage.ref();
    const pathReference = storage.ref("templateStudent.csv");
    var gsReference = storage.refFromURL(
      "gs://project4thquiz.appspot.com/templateStudent.csv"
    );
    storageRef.getDownloadURL().then((res) => {});
    // storageRef
    //   .child("templateStudent.csv")
    //   .getDownloadURL()
    //   .then((url) => {})
    //   .catch((error) => {
    //     // Handle any errors
    //   });
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid container item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.typotitlePaper}>Report</Typography>
            <Button onClick={handleDownload}>download</Button>
            <Grid container item xs={12}>
              <TableReport />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
