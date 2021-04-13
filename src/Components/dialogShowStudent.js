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
  Divider,
} from "@material-ui/core";
import { PanToolOutlined } from "@material-ui/icons";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
  },
  typoDialogTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "24px",
  },
  typoTitle: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "18px",
    marginLeft: "10px",
  },
  typoNameStudent: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    color: "#635f5f",
    marginLeft: "10px",
  },
  divider: {
    margin: "12px 0",
  },
  iconPanTool: {
    fontSize: "20px",
    marginLeft: "8px",
    color: "#5FCCF5",
  },
  closeDialog: {
    fontSize: "16px",
    width: "20%",
  },
});
export default function DialogShowStudent({ open, handleClose, student }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Dialog onClose={handleClose} open={open} fullWidth>
        <Box display="flex" justifyContent="flex-end">
          <Button className={classes.closeDialog} onClick={handleClose}>
            X
          </Button>
        </Box>
        <Grid item xs={12} container justify="center">
          <DialogTitle id="simple-dialog-title">
            <Typography className={classes.typoDialogTitle}>Student</Typography>
          </DialogTitle>
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} container>
          <Typography className={classes.typoTitle}>Raise Hands</Typography>
          {student.map((item) => {
            if (item.raiseHand === true && item.join === true) {
              return (
                <Grid
                  item
                  xs={12}
                  container
                  alignItems="center"
                  key={item.stuid}
                >
                  <Typography className={classes.typoNameStudent}>
                    • {item.fname} {item?.lname}
                  </Typography>
                  <PanToolOutlined className={classes.iconPanTool} />
                </Grid>
              );
            }
          })}
        </Grid>
        <Divider className={classes.divider} />
        <Grid item xs={12} container style={{ marginBottom: "10px" }}>
          <Typography className={classes.typoTitle}>In Class</Typography>
          {student.map((item) => {
            if (item.raiseHand === false && item.join === true) {
              return (
                <Grid item xs={12} container key={item.stuid}>
                  <Typography className={classes.typoNameStudent}>
                    • {item.fname} {item?.lname}
                  </Typography>
                </Grid>
              );
            }
          })}
        </Grid>
      </Dialog>
    </div>
  );
}
