import React from "react";
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

export default function EditName() {
  const classes = useStyles();
  const { onClose, open, name } = props;
  return (
    <Dialog onClose={handleClose} open={open}>
      sdfs
    </Dialog>
  );
}
