import React, { useState, useEffect } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";
import {
  TextField,
  Typography,
  Box,
  Button,
  Grid,
  ThemeProvider,
} from "@material-ui/core";
import swal from "sweetalert";
import { createBrowserHistory } from "history";
import { useHistory } from "react-router-dom";

import { reportService } from "../Services/reportService";

export default function LoginByUserName({ roomPublic, reportId }) {
  const classes = useStyles();
  const [name, setname] = useState();
  const [stuid, setstuid] = useState();
  const [quiz, setquiz] = useState();
  // const history = createBrowserHistory({ forceRefresh: true });
  let history = useHistory();

  useEffect(() => {
    let stuid = localStorage.getItem("stuid");
    if (stuid) {
      reportService.manageStudentByPrivateRoom(stuid, reportId).then((res) => {
        console.log("res---------------------");
        if (res.data.message === "succes") {
          localStorage.setItem("stuid", stuid);
          history.push(`/LanunchStu/${reportId}/${stuid}`);
        }
      });
    }
  });

  const handleClickJoin = () => {
    reportService.manageStudentByPrivateRoom(9999, 9999);

    if (roomPublic) {
      let formStudent = {
        name: name,
        reportId: reportId,
      };
      console.log("formStudent: ", formStudent);
      reportService
        .insertStudentByPublicRoom(formStudent, reportId)
        .then((res) => {
          console.log(res);
          if (res.succes === "succes") {
            localStorage.setItem("stuid", res.stuid);
            history.push(`/LanunchStu/${reportId}/${res.stuid}`);
          } else {
            swal("Error!", "Check sdfsdfsdfsdfID!", "error");
            // swal("Error!", "Check your Student ID!", "error");
          }
        })
        .catch((err) => {
          console.log(err.json);
          swal("Error!", "Check your room name!", "error");
        });
    } else {
      // setTimeout(() => {
      reportService
        .manageStudentByPrivateRoom(stuid, reportId)
        // .manageStudentByPrivateRoom(formStudent, reportId)
        .then((res) => {
          console.log("res- ", res);
          if (res.data.message === "succes") {
            localStorage.setItem("stuid", stuid);
            history.push(`/LanunchStu/${reportId}/${stuid}`);
          } else if (res === 406) {
            swal("Error!", " You have submitted a quiz!", "error");
          } else {
            swal("Error!", "Check your Student ID!", "error");
          }
        })
        .catch((err) => {
          console.log("err- ");
          swal("Error!", "Check your Student ID!", "error");
        });
      // }, 1000);
    }
  };

  const handleChangeTextField = (value) => {
    if (roomPublic) {
      setname(value);
    } else {
      setstuid(value);
    }
  };

  return (
    <ThemeProvider theme={useTheme}>
      <Grid
        container
        item
        xs={12}
        justify="center"
        alignItems="center"
        direction="column"
      >
        <Grid
          className={classes.paper}
          container
          item
          xs={12}
          justify="center"
          alignItems="center"
          direction="column"
        >
          <Typography variant="h2" className={classes.typospace}>
            Student Login
          </Typography>
          <Typography variant="h3">
            {roomPublic ? "Name" : "Enter Your Student ID"}
          </Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              className={classes.textfieldStu}
              id="outlined-basic"
              variant="outlined"
              value={roomPublic ? name : stuid}
              onChange={(e) => handleChangeTextField(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={handleClickJoin}
            >
              Join
            </Button>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
