import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  boxtitle: {
    marginTop: "12px",
    marginLeft: "16px",
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
});

export default function DialogManualAddstudent(props) {
  const classes = useStyles();
  const { onClose, open } = props;
  const [openDialog, setopenDialog] = useState(false);
  const [student, setstudent] = useState([
    { id: "", fname: "", lname: "" },
    { id: "", fname: "", lname: "" },
  ]);

  const handleClose = () => {
    onClose();
  };
  const handleSelect = (value) => {
    onClose(value);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <div className={classes.root}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          className={classes.boxtitle}
        >
          <Box display="flex">
            <Typography className={classes.typoTitle}>AddStudent</Typography>
          </Box>
          <Box display="flex">
            <Button className={classes.closeDialog} onClick={handleClose}>
              X
            </Button>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center" flexDirection="column">
          {student.map((x, i) => {
            return (
              <Box display="flex" justifyContent="center">
                <TextField label="IDStudent" variant="outlined"></TextField>
                <TextField label="FirstName" variant="outlined"></TextField>
                <TextField label="LastName" variant="outlined"></TextField>
              </Box>
            );
          })}
        </Box>
      </div>
    </Dialog>
  );
}
