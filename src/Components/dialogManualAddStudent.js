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
  Paper,
  DialogContent,
  DialogContentText,
} from "@material-ui/core";
import { Clear, Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  boxTitle: {
    marginTop: "12px",
    marginLeft: "9px",
    //marginRight: "16px",
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "20px",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
  boxTextfield: {
    marginRight: "16px",
    //  marginLeft: "16px",
  },
  textfield: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    // padding: theme.spacing(2),
    // margin: theme.spacing(2),
    // marginBottom: "10px",
    marginLeft: "12px",
    // margin: "auto",
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
  paperTextfield: {
    width: "95%",
    margin: "10px 10px 0 10px",
    // overflow: "hidden",
    //padding: theme.spacing(5),
    // marginLeft: "10px",
  },
  groupTextField: {
    margin: "10px 0",
    overflow: "hidden",
  },
}));

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
    // <Grid container spacing={2} className={classes.root}>

    <Dialog
      open={open}
      fullScreen={fullScreen}
      // fullScreen={fullScreen}
      fullWidth
      maxWidth="md"
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Grid spacing={1} className={classes.root} container direction="column">
          <Grid
            item
            xs={12}
            container
            className={classes.boxTitle}
            alignItems="center"
          >
            <Typography className={classes.typoTitle}>AddStudent</Typography>
          </Grid>

          <form noValidate>
            {student.map((stu, i) => {
              return (
                <Grid
                  //className={classes.boxTextfield}
                  container
                  // justifyContent="center"
                  // alignItems="center"
                  direction="column"
                  item
                  xs={12}
                >
                  <Paper elevation={2} className={classes.paperTextfield}>
                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      className={classes.groupTextField}
                    >
                      <DialogContentText>
                        To subscribe to this website, please enter your email
                        address here. We will send updates occasionally.
                      </DialogContentText>
                      <dividers />
                      <Grid item xs={4}>
                        <Typography className={classes.textfield}>
                          IDStudent :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          // fullWidth
                          // label="IDStudent"
                          // autoFocus
                          // margin="dense"
                          variant="outlined"
                          size="small"
                          name="id"
                          value={stu.id}
                          onChange={(event) => handleChange(event, i)}
                        ></TextField>
                      </Grid>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      className={classes.groupTextField}
                    >
                      <Grid item xs={4}>
                        <Typography className={classes.textfield}>
                          FirstName :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          size="small"
                          name="fname"
                          value={stu.fname}
                          onChange={(event) => handleChange(event, i)}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      alignItems="center"
                      className={classes.groupTextField}
                    >
                      <Grid item xs={4}>
                        <Typography className={classes.textfield}>
                          LastName :
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <TextField
                          variant="outlined"
                          size="small"
                          name="lname"
                          value={stu.lname}
                          onChange={(event) => handleChange(event, i)}
                        ></TextField>
                      </Grid>
                    </Grid>
                    <Grid item xs={1}>
                      <Button
                        onClick={() => handleRemove(i)}
                        className={classes.buttonRemove}
                      >
                        <Clear />
                      </Button>
                    </Grid>
                  </Paper>
                </Grid>
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
          </form>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
