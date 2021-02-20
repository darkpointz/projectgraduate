import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
} from "@material-ui/core";
import DialogManualAddstudent from './dialogManualAddStudent'

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  btnConfirm: {
    backgroundColor: "#00b5e2",
    color: "white",
  },
  btnCreateNew: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginRight: "16px",
    marginBottom: "40px",
  },
  btnImport: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginBottom: "40px",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
});

export default function DialogAddstudent(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [openDialog, setopenDialog] = useState(false)

  const handleClose = () => {
    onClose();
  };

  const handleSelectManual = () => {
    setopenDialog(true);
    onClose()
  };

  const handleCloseAddStudent = () => {
    setopenDialog(false);
    onClose();
  };

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <div className={classes.root}>
          <Box display="flex" justifyContent="flex-end">
            <Button className={classes.closeDialog} onClick={handleClose}>
              X
          </Button>
          </Box>
          <Box display="flex" justifyContent="center">
            <DialogTitle id="simple-dialog-title">{`Select a add student method`}</DialogTitle>
          </Box>
          <Box display="flex" justifyContent="center">
            <Button
              className={classes.btnCreateNew}
              variant="contained"
              size="small"
              onClick={handleSelectManual}
            >
              Manual Create
          </Button>
            <Button
              className={classes.btnImport}
              variant="contained"
              size="small"
            // onClick={() => handleSelect("IQ")}
            >
              Import
          </Button>
          </Box>
        </div>
      </Dialog>
      <DialogManualAddstudent open={openDialog} onClose={handleCloseAddStudent} />
    </>
  );
}
