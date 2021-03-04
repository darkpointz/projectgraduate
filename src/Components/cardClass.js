import React, { useState } from "react";
import { useHistory, Route, Switch, Link, Redirect } from "react-router-dom";

import {
  makeStyles,
  Paper,
  IconButton,
  FormControl,
  Typography,
  Box,
  Card,
  CardActions,
  CardContent,
} from "@material-ui/core";
import {
  Public,
  Lock,
  AccountBox,
  Delete,
  EditTwoTone,
} from "@material-ui/icons";
import ClassStudent from "./classStudent";
import DialogDelete from "./dialogDelete";

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
    borderRadius: "50px",
    width: "20%",
    height: "60%",
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
    color: "black",
  },
  btnAccountBox: {
    color: "black",
  },
  iconEdit: {
    marginLeft: "16px",
    color: "#fff",
    fontSize: 24,
  },
  iconTyperoom: {
    marginTop: "2px",
    color: "#494944",
  },
}));
export default function CardClass(props) {
  const classes = useStyles();
  const { room, index, Deleteroom } = props;
  const [opendialogDel, setopendialogDel] = useState(false);

  const handledelete = () => {
    Deleteroom(room.roomId, index);
    setopendialogDel(false);
  };

  const canceldialog = () => {
    setopendialogDel(false);
  };

  const checkAccountBox = (type) => {
    return (
      <div>
        {type ? null : (
          <Link to={`/room/${room.roomId}`}>
            <IconButton aria-label="iconAccountBox">
              <AccountBox className={classes.btnAccountBox} fontSize="large" />
            </IconButton>
          </Link>
        )}
      </div>
    );
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Box display="flex">
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {room.roomName}
            </Typography>
            <EditTwoTone className={classes.iconEdit} />
          </Box>

          <Paper className={classes.paperIcon}>
            <Box display="flex" justifyContent="center">
              {room.roomPublic ? (
                <Public fontSize="large" className={classes.iconTyperoom} />
              ) : (
                <Lock fontSize="large" className={classes.iconTyperoom} />
              )}
            </Box>
          </Paper>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {checkAccountBox(room.roomPublic)}
          <IconButton aria-label="iconDelete">
            <Delete
              className={classes.btnDelete}
              onClick={() => setopendialogDel(true)}
              fontSize="large"
            />
          </IconButton>
        </CardActions>
      </Card>
      <DialogDelete
        open={opendialogDel}
        confirm={handledelete}
        onClose={canceldialog}
      ></DialogDelete>
    </>
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
