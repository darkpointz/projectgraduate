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
    // time: false,
  });

  useEffect(() => {
    setselect(selectMethodQuiz);
    // if (selectMethodQuiz?.delivery === "CBS") {
    //   setcolorCBS({
    //     backgroundColor: "#6DC8BE",
    //     color: "white",
    //   });
    // } else if (selectMethodQuiz?.delivery === "CBT") {
    //   setcolorCBT({
    //     backgroundColor: "#6DC8BE",
    //     color: "white",
    //   });
    // }
  }, []);

  // const [colorCBS, setcolorCBS] = useState({
  //   backgroundColor: "",
  //   color: "",
  // });
  // const [colorCBT, setcolorCBT] = useState({
  //   backgroundColor: "",
  //   color: "",
  // });

  const handleChange = (event) => {
    const { name, checked } = event.target;
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
      default:
        break;
    }
    // console.log(newSelect);
    setselect(newSelect);
    // setselect({ ...select, [event.target.name]: event.target.checked });
    setselectMethodQuiz(newSelect);
  };

  const handleClickBtn = (txt) => {
    let newSelect = { ...select };

    if (txt === "CBS") {
      // setcolorCBS({
      //   backgroundColor: "#6DC8BE",
      //   color: "white",
      // });
      // setcolorCBT({
      //   backgroundColor: "",
      //   color: "",
      // });
      newSelect.delivery = "CBS";
    } else if (txt === "CBT") {
      // setcolorCBS({
      //   backgroundColor: "",
      //   color: "",
      // });
      // setcolorCBT({
      //   backgroundColor: "#6DC8BE",
      //   color: "white",
      // });
      newSelect.SQ = false;
      newSelect.delivery = "CBT";
    }
    setselect(newSelect);
    setselectMethodQuiz(select);
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

        {/* เวลา */}
        {/* <Grid item xs={12} container justify="center">
          <FormControlLabel
            control={
              <ChangeSwitch
                checked={select.time}
                onChange={handleChange}
                name="time"
                color="primary"
              />
            }
            label="Shuffle Questions"
          />
        </Grid> */}
      </Grid>
    </Grid>
  );
}
