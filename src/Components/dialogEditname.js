import React, { useState, useEffect } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  TextField,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Clear, Add } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  boxButton: { marginBottom: "10px" },
  btnConfirm: {
    fontFamily: "'Prompt', sans-serif",
    backgroundColor: "#00b5e2",
    color: "white",
    marginRight: "16px",
    borderRadius: "9px",
  },
  btnCancel: {
    fontFamily: "'Prompt', sans-serif",
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginRight: "16px",
    borderRadius: "9px",
  },
});

export default function DialogEditname({ onClose, open, fname, lname }) {
  const classes = useStyles();
  const [firstname, setfirstname] = useState(fname);
  const [lastname, setlastname] = useState(lname);

  const handleClose = () => {
    onClose();
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    if (name === "firstname") {
      setfirstname(value);
    } else if (name === "lastname") {
      setlastname(value);
    }
  };

  const handleConfirm = () => {
    // confirm(roomName);
  };

  return (
    <Dialog open={open}>
      <div className={classes.root}>
        <DialogTitle id="simple-dialog-title" className={classes.dialogTitle}>
          Edit Student
        </DialogTitle>
        <DialogContent>
          <Typography className={classes.typoTitle}>First Name</Typography>
          <TextField
            id="textfield-edit"
            variant="outlined"
            value={firstname}
            name="firstname"
            fullWidth
            onChange={(e) => handleChange(e)}
          ></TextField>
          <Typography className={classes.typoTitle}>Last Name</Typography>
          <TextField
            id="textfield-edit"
            variant="outlined"
            value={lastname}
            name="lastname"
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
