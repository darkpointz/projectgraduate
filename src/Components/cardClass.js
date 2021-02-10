import React, { useState } from "react";

import {
  makeStyles,
  Paper,
  Button,
  FormControl,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import { Public, Lock, AccountBox, Delete } from "@material-ui/icons";
import ClassStudent from "./classStudent";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    marginRight: "18px",
    marginBottom: "16px",
    borderRadius: "16px",
  },
  cardContent: {
    backgroundColor: "#19A999",
    position: "relative",
  },
  title: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: 20,
    color: "white",
  },
  paperIcon: {
    position: "absolute",
    right: "24px",
    // borderRadius: "20px",
  },
  iconPublic: {
    width: "100px",
  },
  pos: {
    marginBottom: 12,
  },
  cardActions: {
    paddingTop: "60px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "50px",
    },
    display: "flex",
    justifyContent: "flex-end",
  },
  btnDelete: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  btnAccountBox: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
export default function CardClass(props) {
  const classes = useStyles();
  const { room, index, Deleteroom } = props;
  const handledelete = () => {
    Deleteroom(index);
  };

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardContent}>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {room.room}
        </Typography>
        <Paper className={classes.paperIcon}>
          {room.roompublic ? (
            <Public fontSize="large" />
          ) : (
            <Lock fontSize="large" />
          )}
        </Paper>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <AccountBox className={classes.btnAccountBox} fontSize="large" />
        <Delete
          className={classes.btnDelete}
          onClick={handledelete}
          fontSize="large"
        />
      </CardActions>
    </Card>
  );
}
//---
{
  /* <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {room.room}
        </Typography>
        <Typography variant="h5" component="h2"></Typography>
        <Typography className={classes.pos} color="textSecondary">
          adjective
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card> */
}
