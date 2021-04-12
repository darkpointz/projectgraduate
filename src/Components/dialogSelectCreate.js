import React from "react";
import {
  Typography,
  makeStyles,
  Dialog,
  Button,
  DialogTitle,
  Box,
  Paper,
  Grid,
} from "@material-ui/core";
import CSVReader from "react-csv-reader";

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
    // marginLeft: "40px",
    marginBottom: "20px",
    width: "60%",
  },
  btnImport: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginBottom: "20px",
    // marginLeft: "40px",
    display: "flex",
    justifyContent: "center",
    width: "60%",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
  labelCSV: {
    marginLeft: "10px",
  },
  btnTemplate: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "13px",
  },
});

export default function DialogSelectCreateQuiz(props) {
  const classes = useStyles();
  const { onClose, open, name, type } = props;

  const handleClose = () => {
    onClose("0");
  };
  const handleSelect = (value) => {
    onClose(value);
  };

  const handleForce = (data) => {
    onClose("import", data);
  };

  const papaparseOptions = {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.toLowerCase().replace(/\W/g, "_"),
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box display="flex" justifyContent="flex-end">
        <Button className={classes.closeDialog} onClick={handleClose}>
          X
        </Button>
      </Box>
      <Grid item xs={12} container justify="center">
        <DialogTitle id="simple-dialog-title">{`Select a ${name} method`}</DialogTitle>
      </Grid>
      <Grid item xs={12} container justify="center">
        <Button
          className={classes.btnCreateNew}
          variant="contained"
          size="small"
          onClick={() => handleSelect("createNew")}
        >
          Create New
        </Button>
      </Grid>
      <Grid item xs={12} container justify="center">
        {type === "classStudent" ? (
          <Button
            className={classes.btnImport}
            variant="contained"
            size="small"
          >
            <CSVReader
              inputStyle={{
                opacity: 0,
                width: "170px",
                marginLeft: "-162px",
                textalign: "center",
              }}
              label="Import with CSV File"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
            />
          </Button>
        ) : null}
      </Grid>
      {type === "classStudent" ? (
        <Grid item xs={12} container justify="flex-end">
          <Button
            className={classes.btnTemplate}
            href="https://firebasestorage.googleapis.com/v0/b/project4thquiz.appspot.com/o/templateStudent.csv?alt=media&token=fc9bd36a-19e6-4bf1-9fcc-71de888ad45f"
          >
            Download Template CSV
          </Button>
        </Grid>
      ) : null}
    </Dialog>
  );
}
