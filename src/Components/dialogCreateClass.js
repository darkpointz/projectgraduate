import React from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
} from "@material-ui/core";

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
    fontSize: "18px",
    width: "20%",
  },
});

export default function DialogCreateClass(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };
  const handleSelect = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.root}>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.closeDialog} onClick={handleClose}>
            X
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <DialogTitle id="simple-dialog-title">{`Select a create class method`}</DialogTitle>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            className={classes.btnCreateNew}
            variant="contained"
            size="small"
            onClick={() => handleSelect("CN")}
          >
            Create Class
          </Button>
          <Button
            className={classes.btnImport}
            variant="contained"
            size="small"
            onClick={() => handleSelect("IQ")}
          >
            Import Class
          </Button>
        </Box>
      </div>
    </Dialog>
  );
}
