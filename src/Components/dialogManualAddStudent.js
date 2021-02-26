import React, { useState } from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  useMediaQuery,
  Box,
  TextField,
  useTheme,
  Grid,
} from "@material-ui/core";
import { Clear, Add } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  boxTitle: {
    marginTop: "12px",
    marginLeft: "16px",
    //marginRight: "16px",
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
  boxTextfield: {
    marginRight: "16px",
    marginLeft: "16px",
  },
  textfield: {
    marginBottom: "10px",
    marginRight: "10px",
  },
  buttonRemove: {
    padding: "0px",
    color: "#6D9EC4",
  },
  btnAddStudent: {
    marginLeft: "16px",
    marginBottom: "10px",
    fontFamily: "'Prompt', sans-serif",
    color: "#6D9EC4",
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

export default function DialogManualAddstudent(props) {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const { onClose, open, saveNewstudent } = props;
  const [openDialog, setopenDialog] = useState(false);
  const [student, setstudent] = useState([{ id: "", fname: "", lname: "" }]);

  const handleClose = () => {
    onClose();
  };

  const handleSelect = (value) => {
    onClose(value);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const newstudent = [...student];
    newstudent[i][name] = value;
    setstudent(newstudent);
  };

  const handleAddanother = () => {
    setstudent([...student, { id: "", fname: "", lname: "" }]);
  };

  const handleRemove = (index) => {
    const list = [...student];
    list.splice(index, 1);
    setstudent(list);
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveNewstudent(student);
    setstudent([{ id: "", fname: "", lname: "" }]);
  };

  return (
    <div className={classes.root}>
      <Dialog
        onClose={handleClose}
        open={open}
        fullScreen={fullScreen}
        fullWidth
      >
        <Grid container spacing={3}>
          <Grid container alignItems="center" justify="space-between">
            <Grid item xs={11}>
              <Typography className={classes.typoTitle}>AddStudent</Typography>
            </Grid>
            <Grid item xs={1}>
              <Button className={classes.closeDialog} onClick={handleClose}>
                <Clear />
              </Button>
            </Grid>
          </Grid>
          <form noValidate>
            <Box display="flex" justifyContent="center" flexDirection="column">
              {student.map((stu, i) => {
                return (
                  <Box
                    className={classes.boxTextfield}
                    display="flex"
                    justifyContent="center"
                    alignContent="center"
                  >
                    <TextField
                      className={classes.textfield}
                      fullWidth
                      label="IDStudent"
                      variant="outlined"
                      size="small"
                      name="id"
                      value={stu.id}
                      onChange={(event) => handleChange(event, i)}
                    ></TextField>
                    <TextField
                      className={classes.textfield}
                      fullWidth
                      label="FirstName"
                      variant="outlined"
                      size="small"
                      name="fname"
                      value={stu.fname}
                      onChange={(event) => handleChange(event, i)}
                    ></TextField>
                    <TextField
                      className={classes.textfield}
                      label="LastName"
                      variant="outlined"
                      size="small"
                      name="lname"
                      value={stu.lname}
                      onChange={(event) => handleChange(event, i)}
                    ></TextField>
                    <Button
                      onClick={() => handleRemove(i)}
                      className={classes.buttonRemove}
                    >
                      <Clear />
                    </Button>
                  </Box>
                );
              })}
              <Box display="flex" justifyContent="space-between">
                <Button
                  className={classes.btnAddStudent}
                  size="large"
                  onClick={handleAddanother}
                >
                  <Add />
                  Add Another
                </Button>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  className={classes.boxButton}
                >
                  <Button
                    className={classes.btnConfirm}
                    variant="contained"
                    size="large"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                  <Button
                    className={classes.btnCancel}
                    variant="contained"
                    size="medium"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Grid>
      </Dialog>
    </div>
  );
}
