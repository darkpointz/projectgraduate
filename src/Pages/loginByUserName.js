import React, { useState } from "react";

import { Paper, TextField, Typography, Box, Button } from "@material-ui/core";
import swal from "sweetalert";
import { createBrowserHistory } from "history";

import { reportService } from "../Services/reportService";

export default function LoginByUserName({ roomPublic, reportId }) {
  const [name, setname] = useState();
  const [stuId, setstuId] = useState();
  const [quiz, setquiz] = useState();
  const history = createBrowserHistory({ forceRefresh: true });

  const handleClickJoin = () => {
    if (roomPublic) {
      let formStudent = {
        name: name,
        reportId: reportId,
      };
      // reportService.getQuizPrivateRoomByStudent;
    } else {
      let formStudent = {
        reportId: reportId,
        stuid: stuId,
      };
      console.log(formStudent);
      history.push(`/LanunchStuCBS/${reportId}/${stuId}`);
      // reportService
      //   .getQuizPrivateRoomByStudent(formStudent)
      //   .then((res) => {
      //     console.log(res);
      //   })
      //   .catch((err) => {
      //     console.log(err.json);
      //     swal("Error!", "Check your room name!", "error");
      //   });
    }
  };

  const handleChangeTextField = (value) => {
    if (roomPublic) {
      setname(value);
    } else {
      setstuId(value);
    }
  };

  return (
    <div>
      <Paper>
        <Typography>{roomPublic ? "Name" : "Student ID"}</Typography>
        <Box display="flex" flexDirection="column">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={roomPublic ? name : stuId}
            onChange={(e) => handleChangeTextField(e.target.value)}
          ></TextField>
          <Button onClick={handleClickJoin}>Join</Button>
        </Box>
      </Paper>
    </div>
  );
}
