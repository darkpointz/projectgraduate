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
    justifyContent: "center",
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
  closeDialog: { fontSize: "18px", width: "20%" },
});

export default function DialogSelectCreateQuiz(props) {
  const classes = useStyles();
  const { onClose, open } = props;

  const handleClose = () => {
    onClose("0");
  };
  const handleSelect = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.closeDialog} onClick={handleClose}>
          X
        </Button>
      </Box>

      <DialogTitle id="simple-dialog-title">{`Select a create quiz method`}</DialogTitle>
      <div className={classes.root}>
        <Button
          className={classes.btnCreateNew}
          variant="contained"
          size="small"
          onClick={() => handleSelect("CN")}
        >
          Create New
        </Button>
        <Button
          className={classes.btnCreateNew}
          variant="contained"
          size="small"
          onClick={() => handleSelect("IQ")}
        >
          Import Quiz
        </Button>
      </div>
    </Dialog>
  );
}
