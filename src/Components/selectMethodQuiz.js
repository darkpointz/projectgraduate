import React, { useState, useEffect } from "react";

import {
  makeStyles,
  withStyles,
  Grid,
  Typography,
  Button,
  Divider,
  FormControlLabel,
  Switch,
  FormGroup,
  TextField,
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";
import clsx from "clsx";

const useStyles = makeStyles({
  divider: {
    marginTop: "16px",
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    marginTop: "6px",
    marginLeft: "12px",
  },
  typoSwitch: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
  gridSwitchRow: { marginTop: "10px", marginLeft: "12px" },
  btnDelivery: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    // backgroundColor: { colorCBS },
  },
  btnSelectDelivery: {
    backgroundColor: "#6DC8BE",
    color: "white",
  },
  textFieldTime: {
    width: "90%",
  },
});

const ChangeSwitch = withStyles({
  switchBase: {
    color: teal[300],
    "&$checked": {
      color: teal[400],
    },
    "&$checked + $track": {
      backgroundColor: teal[400],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function SelectMethodQuiz(props) {
  const classes = useStyles();
  const { selectMethodQuiz, setselectMethodQuiz } = props;
  // const [select, setselect] = useState(selectMethodQuiz);
  const [select, setselect] = useState({
    delivery: "",
    SQ: false,
    SA: false,
    SADA: false,
    SAAA: false,
    timeQuiz: false,
    timeEachQuestion: false,
    minQuiz: 0,
    minEach: 0,
    secQuiz: 10,
    secEach: 10,
  });
  // const [minQuiz, setminQuiz] = useState(0);
  // const [minEach, setminEach] = useState(0);
  // const [secQuiz, setsecQuiz] = useState(10);
  // const [secEach, setsecEach] = useState(10);

  useEffect(() => {
    setselect(selectMethodQuiz);
  }, []);

  const handleChange = (event) => {
    const { name, checked, value } = event.target;
    let newSelect = { ...select };
    switch (name) {
      case "SQ":
        newSelect.SQ = !newSelect.SQ;
        break;
      case "SA":
        newSelect.SA = !newSelect.SA;
        break;
      case "SADA":
        newSelect.SADA = !newSelect.SADA;
        break;
      case "SAAA":
        newSelect.SAAA = !newSelect.SAAA;
        break;
      case "timeQuiz":
        newSelect.timeQuiz = !newSelect.timeQuiz;
        if (newSelect.timeQuiz === true) {
          newSelect.timeEachQuestion = false;
          newSelect.minEach = 0;
          newSelect.secEach = 0;
        }
        break;
      case "timeEachQuestion":
        newSelect.timeEachQuestion = !newSelect.timeEachQuestion;
        if (newSelect.timeEachQuestion === true) {
          newSelect.timeQuiz = false;
          newSelect.minQuiz = 0;
          newSelect.secQuiz = 0;
        }
        break;
      case "minQuiz":
        newSelect.minQuiz = value;
        break;
      case "minEach":
        newSelect.minEach = value;
        break;
      case "secQuiz":
        newSelect.secQuiz = value;
        break;
      case "secEach":
        newSelect.secEach = value;
        break;
      default:
        break;
    }
    setselect(newSelect);
    let option = true;
    setselectMethodQuiz(newSelect, option);
  };

  const handleClickBtn = (txt) => {
    let newSelect = { ...select };

    if (txt === "CBS") {
      newSelect.SADA = false;
      newSelect.timeEachQuestion = false;
      newSelect.delivery = "CBS";
    } else if (txt === "CBT") {
      newSelect.SQ = false;
      newSelect.timeQuiz = false;
      newSelect.delivery = "CBT";
    }
    setselect(newSelect);
    let option = false;
    setselectMethodQuiz(newSelect, option);
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography className={classes.typoTitle}>
          Setting and Choose Delivery Method
        </Typography>
      </Grid>

      <Grid item xs={12} container>
        <Grid item xs={6} container justify="center">
          <Button
            variant="outlined"
            className={clsx(classes.btnDelivery, {
              [classes.btnSelectDelivery]: select?.delivery === "CBS",
            })}
            // style={{
            //   backgroundColor: colorCBS.backgroundColor,
            //   color: colorCBS.color,
            // }}
            onClick={() => handleClickBtn("CBS")}
          >
            Open Navigation
          </Button>
        </Grid>
        <Grid item xs={6} container justify="center">
          <Button
            variant="outlined"
            className={clsx(classes.btnDelivery, {
              [classes.btnSelectDelivery]: select?.delivery === "CBT",
            })}
            // style={{
            //   backgroundColor: colorCBT.backgroundColor,
            //   color: colorCBT.color,
            // }}
            onClick={() => handleClickBtn("CBT")}
          >
            Teacher Paced
          </Button>
        </Grid>

        <Grid item xs={12} className={classes.divider}>
          <Divider />
        </Grid>

        <Grid item xs={12} className={classes.gridSwitchRow}>
          <FormGroup>
            <Grid item xs={12} container>
              <Grid item xs={6} container>
                <FormControlLabel
                  control={
                    <ChangeSwitch
                      checked={select.SQ}
                      name="SQ"
                      onChange={(e) => handleChange(e)}
                      color="primary"
                      disabled={select.delivery === "CBT"}
                    />
                  }
                  label={
                    <Typography className={classes.typoSwitch}>
                      Shuffle Questions
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <ChangeSwitch
                      checked={select.SA}
                      name="SA"
                      onChange={(e) => handleChange(e)}
                      color="primary"
                    />
                  }
                  label={
                    <Typography className={classes.typoSwitch}>
                      Shuffle Answers
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        <Grid item xs={12} className={classes.gridSwitchRow}>
          <FormGroup>
            <Grid item xs={12} container>
              <Grid item xs={6} container>
                <FormControlLabel
                  control={
                    <ChangeSwitch
                      checked={select.SADA}
                      onChange={(e) => handleChange(e)}
                      name="SADA"
                      color="primary"
                      disabled={select.delivery === "CBS"}
                    />
                  }
                  label={
                    <Typography className={classes.typoSwitch}>
                      Show Answers During Activity
                    </Typography>
                  }
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  control={
                    <ChangeSwitch
                      checked={select.SAAA}
                      onChange={(e) => handleChange(e)}
                      name="SAAA"
                      color="primary"
                    />
                  }
                  label={
                    <Typography className={classes.typoSwitch}>
                      Show Answers After Activity
                    </Typography>
                  }
                />
              </Grid>
            </Grid>
          </FormGroup>
        </Grid>

        {/* timeQuiz */}
        <Grid
          item
          xs={12}
          container
          className={classes.gridSwitchRow}
          alignItems="center"
        >
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <ChangeSwitch
                  checked={select.timeQuiz}
                  onChange={(e) => handleChange(e)}
                  name="timeQuiz"
                  color="primary"
                  disabled={select.delivery === "CBT"}
                />
              }
              label={
                <Typography className={classes.typoSwitch}>
                  Set time limit for quiz
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.textFieldTime}
              type="number"
              variant="outlined"
              size="small"
              name="minQuiz"
              value={select.minQuiz}
              error={
                select.minQuiz <= 360 && select.minQuiz >= 0 ? false : true
              }
              onChange={(e) => handleChange(e)}
              InputProps={{
                inputProps: {
                  max: 360,
                  min: 0,
                },
              }}
              disabled={select.timeQuiz === false}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography className={classes.typoSwitch}>min</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.textFieldTime}
              type="number"
              variant="outlined"
              size="small"
              name="secQuiz"
              value={select.secQuiz}
              error={
                (select.secQuiz <= 60 && select.secQuiz >= 10) ||
                select.minQuiz >= 1
                  ? false
                  : true
              }
              onChange={(e) => handleChange(e)}
              InputProps={{
                inputProps: {
                  max: 60,
                  min: 10,
                },
              }}
              disabled={select.timeQuiz === false}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography className={classes.typoSwitch}>sec</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          className={classes.gridSwitchRow}
          alignItems="center"
        >
          {/* timeEachQuestion */}
          <Grid item xs={6}>
            <FormControlLabel
              control={
                <ChangeSwitch
                  checked={select.timeEachQuestion}
                  onChange={handleChange}
                  name="timeEachQuestion"
                  color="primary"
                  disabled={select.delivery === "CBS"}
                />
              }
              label={
                <Typography className={classes.typoSwitch}>
                  Set time limit for each question
                </Typography>
              }
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.textFieldTime}
              type="number"
              variant="outlined"
              size="small"
              name="minEach"
              value={select.minEach}
              error={
                select.minEach <= 360 && select.minEach >= 0 ? false : true
              }
              onChange={(e) => handleChange(e)}
              InputProps={{
                inputProps: {
                  max: 360,
                  min: 0,
                },
              }}
              disabled={select.timeEachQuestion === false}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography className={classes.typoSwitch}>min</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              className={classes.textFieldTime}
              type="number"
              variant="outlined"
              size="small"
              name="secEach"
              value={select.secEach}
              error={
                (select.secEach <= 60 && select.secEach >= 10) ||
                select.minEach >= 1
                  ? false
                  : true
              }
              // helperText="Incorrect."
              onChange={(e) => handleChange(e)}
              InputProps={{
                inputProps: {
                  max: 60,
                  min: 10,
                },
              }}
              disabled={select.timeEachQuestion === false}
            />
          </Grid>
          <Grid item xs={1}>
            <Typography className={classes.typoSwitch}>sec</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
