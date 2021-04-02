import React, { useState } from "react";
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

import { reportService } from "../Services/reportService";

export default function LoginByroomName({ handleSetRoom }) {
  const [room, setroom] = useState("");
  const classes = useStyles();

  const handleClickJoin = () => {
    reportService
      .getRoomTypeByStudent(room)
      .then((res) => {
        handleSetRoom(res.reportId, res.roomPublic);
      })
      .catch((err) => {
        console.log(err.json);
        swal("Error!", "Check your room name!", "error");
      });
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
          <Typography variant="h3">Enter Room Name</Typography>
          <Box display="flex" flexDirection="column">
            <TextField
              className={classes.textfieldStu}
              id="outlined-basic"
              variant="outlined"
              value={room}
              onChange={(e) => setroom(e.target.value)}
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
