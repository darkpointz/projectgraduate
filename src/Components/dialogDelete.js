import React from "react";
import {
  DialogContent,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  DialogContentText,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {},
  btnConfirm: {
    backgroundColor: "#00b5e2",
    color: "white",
  },
  btnCancel: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
  },
});

export default function DialogDelete(props) {
  const classes = useStyles();
  const { open, onClose, confirm } = props;

  const handleClose = () => {
    onClose();
  };

  const handlebtnconfirm = () => {
    confirm();
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">{`Please Confirm`}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          Are you sure you want to delete?
        </DialogContentText>
      </DialogContent>
      <Box display="flex" justifyContent="space-evenly" marginBottom="12px">
        <Button
          className={classes.btnConfirm}
          variant="contained"
          size="medium"
          onClick={handlebtnconfirm}
        >
          Yes
        </Button>
        <Button
          className={classes.btnCancel}
          variant="contained"
          size="medium"
          onClick={handleClose}
        >
          No
        </Button>
      </Box>
    </Dialog>
  );
}
