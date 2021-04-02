import React, { useState } from "react";
import { useStyles } from "../Pages/styles";
import { useTheme } from "../Pages/theme";

import { TextField, Typography, Box, Button, Grid, ThemeProvider, } from "@material-ui/core";
import swal from "sweetalert";
import { createBrowserHistory } from "history";

import { reportService } from "../Services/reportService";

export default function LoginByUserName({ roomPublic, reportId }) {
  const [name, setname] = useState();
  const [stuid, setstuid] = useState();
  const history = createBrowserHistory({ forceRefresh: true });
  const classes = useStyles();

  const handleClickJoin = () => {
    if (roomPublic) {
      let formStudent = {
        name: name,
        reportId: reportId,
      };
      reportService
        .insertStudentByPublicRoom(formStudent, reportId)
        .then((res) => {
          console.log(res);
          if (res.succes === "succes") {
            history.push(`/LanunchStu/${reportId}/${res.stuid}`);
          } else {
            swal("Error!", "Check your Student ID!", "error");
          }
        })
        .catch((err) => {
          console.log(err.json);
          swal("Error!", "Check your room name!", "error");
        });
    } else {
      let formStudent = {
        reportId: reportId,
        stuid: stuid,
      };

      reportService
        .manageStudentByPrivateRoom(formStudent, reportId)
        .then((res) => {
          console.log(res);
          if (res.succes === "succes") {
            history.push(`/LanunchStu/${reportId}/${stuid}`);
          } else {
            swal("Error!", "Check your Student ID!", "error");
          }
        })
        .catch((err) => {
          console.log(err.json);
          swal("Error!", "Check your Student ID!", "error");
        });
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
          <Typography variant="h3">{roomPublic ? "Name" : "Enter Your Student ID"}</Typography>
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
