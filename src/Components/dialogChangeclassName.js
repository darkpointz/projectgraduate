import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@material-ui/core";
import { Clear, Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dialogTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "26px",
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    color: "#636363",
  },
  btnRename: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    backgroundColor: "#00b5e2",
    color: "#fff",
  },
  btnCancel: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    backgroundColor: "#fff",
    color: "#00b5e2",
  },
}));

export default function DialogChangeclassName({
  open,
  confirm,
  onClose,
  name,
}) {
  const classes = useStyles();
  const [roomName, setroomName] = useState(name);

  const handleClose = () => {
    onClose();
  };

  const handleConfirm = () => {
    confirm(roomName);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setroomName(value);
  };

  return (
    <Dialog open={open}>
      <div className={classes.root}>
        <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>
          Rename Room
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.typoTitle}>Room Name</Typography>
          <TextField
            id="textfield-edit"
            variant="outlined"
            value={roomName}
            fullWidth
            onChange={(e) => handleChange(e)}
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            className={classes.btnRename}
            onClick={handleConfirm}
          >
            Rename
          </Button>
          <Button
            variant="contained"
            className={classes.btnCancel}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}
