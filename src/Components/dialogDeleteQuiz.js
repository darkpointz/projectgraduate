import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
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

export default function DialogDeleteQuiz(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("0");
  };

  const handlebtnconfirm = () => {
    onClose("1");
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="simple-dialog-title">{`ยืนยันการลบข้อที่ ${props.step} ?`}</DialogTitle>
      <Box display="flex" justifyContent="space-evenly" marginBottom="12px">
        <Button
          className={classes.btnConfirm}
          variant="contained"
          size="medium"
          onClick={handlebtnconfirm}
        >
          ตกลง
        </Button>
        <Button
          className={classes.btnCancel}
          variant="contained"
          size="medium"
          onClick={handleClose}
        >
          ยกเลิก
        </Button>
      </Box>
    </Dialog>
  );
}
