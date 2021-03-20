import React, { useState } from "react";

import { Paper, TextField, Typography, Box, Button } from "@material-ui/core";
import swal from "sweetalert";

import { Menu, ExitToApp } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import LoginByUserName from "./loginByUserName";

import { reportService } from "../Services/reportService";

export default function LoginByroomName({ handleSetRoom }) {
  const [room, setroom] = useState("");

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
    <Paper>
      <Typography>Room Name</Typography>
      <Box display="flex" flexDirection="column">
        <TextField
          id="outlined-basic"
          variant="outlined"
          value={room}
          onChange={(e) => setroom(e.target.value)}
        ></TextField>
        <Button onClick={handleClickJoin}>Join</Button>
      </Box>
    </Paper>
  );
}
