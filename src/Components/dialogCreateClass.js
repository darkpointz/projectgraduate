import React, { useState } from "react";
import {
  Typography,
  TextField,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  Switch,
  withStyles,
} from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  dialogTitle: {
    paddingLeft: "10",
  },
  btnConfirm: {
    backgroundColor: "#00b5e2",
    color: "white",
  },
  btnsubmit: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginBottom: "20px",
  },
  txtfield: {
    marginBottom: "18px",
    //marginLeft: "10px",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
  typoSwitch: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    marginLeft: "12px",
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

export default function DialogCreateClass(props) {
  const classes = useStyles();
  const [roomPublic, setroomPublic] = useState(false);
  const [roomName, setroomName] = useState("");
  const { onClose, open, createroom } = props;

  const handleClose = () => {
    onClose();
  };
  const handlesubmit = () => {
    const newroom = { roomName, roomPublic };
    createroom(newroom);
    setroomName("");
    setroomPublic(false);
  };
  const handleChange = (event) => {
    setroomPublic(event.target.checked);
  };
  const handletxtfield = (event) => {
    setroomName(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.root}>
        <Box display="flex" justifyContent="space-between">
          <DialogTitle
            id="simple-dialog-title"
            className={classes.dialogTitle}
          >{`Create Room`}</DialogTitle>
          <Button className={classes.closeDialog} onClick={handleClose}>
            X
          </Button>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginX="20px"
        >
          <TextField
            id="filled-required"
            label="Enter Room Name"
            value={roomName}
            onChange={handletxtfield}
            className={classes.txtfield}
          ></TextField>
          <Typography className={classes.typoSwitch}>
            {roomPublic ? "Public" : "Private"}
          </Typography>
          <ChangeSwitch
            checked={roomPublic}
            onChange={handleChange}
            color="primary"
            name="checkedB"
            className={classes.switch}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            className={classes.btnsubmit}
            variant="contained"
            size="small"
            onClick={handlesubmit}
          >
            Create Class
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}
