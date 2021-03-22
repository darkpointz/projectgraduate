import React, { useState } from "react";

import { Paper, TextField, Typography, Box, Button } from "@material-ui/core";
import swal from "sweetalert";
import { createBrowserHistory } from "history";

import { reportService } from "../Services/reportService";

export default function LoginByUserName({ roomPublic, reportId }) {
  const [name, setname] = useState();
  const [stuid, setstuid] = useState();
  const [quiz, setquiz] = useState();
  const history = createBrowserHistory({ forceRefresh: true });

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
    <div>
      <Paper>
        <Typography>{roomPublic ? "Name" : "Student ID"}</Typography>
        <Box display="flex" flexDirection="column">
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={roomPublic ? name : stuid}
            onChange={(e) => handleChangeTextField(e.target.value)}
          ></TextField>
          <Button onClick={handleClickJoin}>Join</Button>
        </Box>
      </Paper>
    </div>
  );
}
