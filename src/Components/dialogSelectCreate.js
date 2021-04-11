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
    marginRight: "16px",
    marginBottom: "40px",
  },
  btnImport: {
    backgroundColor: "#E4FBFF",
    color: "#00b5e2",
    marginBottom: "40px",
    display: "flex",
    justifyContent: "center",
    width: "80%",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
  importCSV: {
    backgroundColor: "#E4FBFF",
  },
  btnInput: { backgroundColor: "#E4FBFF" },
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
        <Grid item xs={6} container justify="center">
          <Button
            className={classes.btnCreateNew}
            variant="contained"
            size="small"
            onClick={() => handleSelect("createNew")}
          >
            Create New
          </Button>
        </Grid>
        <Grid item xs={6} container justify="center" direction="column">
          {type === "classStudent" ? (
            // <div className={classes.importCSV}>
            // <Paper className={classes.btnImport}>
            <CSVReader
              // cssClass={classes.btnImport}
              cssInputClass={classes.btnInput}
              cssLabelClass={classes.btnInput}
              // cssClass="react-csv-input"
              label="Import student with CSV"
              onFileLoaded={handleForce}
              parserOptions={papaparseOptions}
            />
          ) : // </Paper>
          // </div>
          // <Button
          //   className={classes.btnImport}
          //   variant="contained"
          //   size="small"
          //   onClick={() => handleSelect("import")}
          // >
          //   Import
          // </Button>
          null}
        </Grid>
      </Grid>
    </Dialog>
  );
}
