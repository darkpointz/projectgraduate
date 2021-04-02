import React from "react";
import { Dialog, DialogTitle, TextField } from "@material-ui/core";

export default function DialogEditname(props) {
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
