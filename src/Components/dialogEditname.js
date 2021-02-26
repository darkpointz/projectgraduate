import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  TextField,
  withStyles,
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

export default function DialogEditname(props) {
  const classes = useStyles();
  const { onClose, open, name } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">{`Edit Student`}</DialogTitle>
      <TextField label="FirstName" variant="outlined" size="small"></TextField>
    </Dialog>
  );
}
