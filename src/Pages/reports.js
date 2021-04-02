import React from "react";
import {
  makeStyles,
  Paper,
  Typography,
  Grid,
} from "@material-ui/core";
import TableReport from "../Components/tableReport";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
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
  },
}));

export default function Reports() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={1} direction="column">
        <Grid container item xs={12}>
          <Paper className={classes.paper}>
            <Typography className={classes.typotitlePaper}>Report</Typography>

            <Grid container item xs={12}>
              <TableReport />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
