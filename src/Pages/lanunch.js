import React, { useState, useEffect } from "react";

import {
  makeStyles,
  IconButton,
  Button,
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
} from "@material-ui/core";
import { Person, People } from "@material-ui/icons";
import DialogSelectSetting from "../Components/dialogSelectSetting";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  paperClassic: {
    backgroundColor: "#6DC8BE",
    width: "200px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "18px",
    [theme.breakpoints.down("sm")]: {
      width: "150px",
    },
  },
  icon: {
    color: "white",
    fontSize: "90px",
    [theme.breakpoints.down("sm")]: {
      width: "100px",
      fontSize: "70px",
    },
  },
  typolabel: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "26px",
    },
  },
  divider: {
    marginTop: "24px",
  },
  typoQuickQuestion: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "28px",
  },
  paperQQMC: {
    backgroundColor: "#e2a073",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
    cursor: "pointer",
  },
  paperQQTF: {
    backgroundColor: "#19b0b8",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  paperQQSA: {
    backgroundColor: "#f66a7a",
    width: "180px",
    [theme.breakpoints.down("sm")]: {
      width: "110px",
    },
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    borderRadius: "16px",
  },
  typoQQicon: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "36px",
    marginTop: "6px",
  },
  typoQQlabel: {
    color: "white",
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "22px",
    marginBottom: "6px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "12px",
    },
  },
  iconButton: {
    "&:hover": {
      borderRadius: "20px",
    },
    transition: "default",
  },
}));

export default function Lanunch() {
  const classes = useStyles();
  const [openDialogLanunch, setopenDialogLanunch] = useState(false);

  const handleClose = () => {
    setopenDialogLanunch(false);
  };
  const livequiz = () => {
    setopenDialogLanunch(false);
    console.log("livequiz");
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} container>
          <Grid item xs={6} container justify="center">
            <IconButton className={classes.iconButton}>
              <Paper
                className={classes.paperClassic}
                onClick={(e) => setopenDialogLanunch(true)}
              >
                <Person className={classes.icon} />
                <Typography className={classes.typolabel}>Classic</Typography>
              </Paper>
            </IconButton>
          </Grid>
          <Grid item xs={6} container justify="center">
            <IconButton className={classes.iconButton}>
              <Paper className={classes.paperClassic}>
                <People className={classes.icon} />
                <Typography className={classes.typolabel}>Group</Typography>
              </Paper>
            </IconButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Divider className={classes.divider} />
        </Grid>

        <Grid item xs={12} container justify="center">
          <Typography className={classes.typoQuickQuestion}>
            Quick Question
          </Typography>
        </Grid>

        <Grid item xs={12} container>
          <Grid item xs={4} container justify="center">
            <Paper className={classes.paperQQMC}>
              <Typography className={classes.typoQQicon}>MC</Typography>
              <Typography className={classes.typoQQlabel}>
                Multiplechoice
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={4} container justify="center">
            <Paper className={classes.paperQQTF}>
              <Typography className={classes.typoQQicon}>TF</Typography>
              <Typography className={classes.typoQQlabel}>Truefalse</Typography>
            </Paper>
          </Grid>
          <Grid item xs={4} container justify="center">
            <Paper className={classes.paperQQSA}>
              <Typography className={classes.typoQQicon}>SA</Typography>
              <Typography className={classes.typoQQlabel}>
                ShortAnswer
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <DialogSelectSetting
          open={openDialogLanunch}
          onClose={handleClose}
          confirm={livequiz}
        />
      </Grid>
    </div>
  );
}
