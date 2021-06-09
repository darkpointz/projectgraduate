import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import axios from "axios";

import {
  makeStyles,
  IconButton,
  Button,
  FormControl,
  Typography,
  Box,
  Grid,
} from "@material-ui/core";
import { Add, Search, Edit } from "@material-ui/icons";
import DialogCreateClass from "../Components/dialogCreateClass";
import CardClass from "../Components/cardClass";
import { classService } from "../Services/classService";
import swal from "sweetalert";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  // layotBtnCreate: { display: "flex", justifyContent: "flex-end" },
  btnCreate: {
    display: "flex",
    borderRadius: "20px",
    backgroundColor: "#42ea5e",
    color: "white",
    height: "45px",
    marginBottom: "10px",
    [theme.breakpoints.down("sm")]: {
      height: "37px",
      marginBottom: "0",
    },
  },
  iconAddQuiz: {
    marginRight: "3px",
  },
  typoAddQuiz: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
  },
  content: {
    flexGrow: 1,
  },
  paper: {
    backgroundColor: "#6DC8BE",
    flexGrow: 1,
    paddingTop: "10px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "6px",
    },
  },
  inputRoot: {
    color: "inherit",
  },
  formtextfield: {
    width: "55%",
  },
  textfieldSearch: {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    // transition: theme.transitions.create("width"),
    // [theme.breakpoints.up("md")]: {
    //   width: "20ch",
    // },
  },
  typotitlePaper: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "28px",
    marginLeft: "16px",
  },
}));

export default function Class() {
  const classes = useStyles();
  const [openCreateClass, setOpenCreateClass] = useState(false);
  const [room, setroom] = useState([]);
  const [userId, setuserId] = useState();

  useEffect(() => {
    const uId = localStorage.getItem("userId");
    classService.getAllRoom(uId).then((res) => {
      setroom(res);
      setuserId(uId);
    });
  }, []);

  const handleClose = (value) => {
    setOpenCreateClass(false);
  };
  const createroom = (newroom) => {
    const formroom = {
      roomName: newroom.roomName,
      roomPublic: newroom.roomPublic,
    };
    classService
      .insertRoom(formroom, userId)
      .then((res) => {
        setOpenCreateClass(false);
        if (res.data.message === "success") {
          newroom.roomId = res.data.roomId;
          setroom([...room, newroom]);
          swal("Success!", "Create room success!", "success");
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          swal(
            "Error!",
            `The room name ${newroom.roomName} already exists.!`,
            "error"
          );
        }
      });
  };

  const handleDeleteroom = (roomId, index) => {
    classService.deleteRoomByRoomId(roomId).then((res) => {
      let newroom = [...room];
      newroom.splice(index, 1);
      setroom(newroom);
    });
  };

  const handleChangeRoomName = (index, newroomName) => {
    let newRoom = [...room];
    newRoom[index].roomName = newroomName;
    setroom(newRoom);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="column">
        <Grid
          container
          item
          xs={12}
          alignItems="center"
          justify="space-between"
        >
          <Typography className={classes.typotitlePaper}>MyClass</Typography>
          <Button
            variant="contained"
            className={classes.btnCreate}
            onClick={() => setOpenCreateClass(true)}
          >
            <Add className={classes.iconAddQuiz} />
            <Typography className={classes.typoAddQuiz}>Createclass</Typography>
          </Button>
        </Grid>

        <Grid container item xs={12}>
          {room?.map((room, index) => {
            return (
              <CardClass
                key={room.roomId}
                room={room}
                index={index}
                Deleteroom={handleDeleteroom}
                changeRoomName={handleChangeRoomName}
              />
            );
          })}
        </Grid>
        <DialogCreateClass
          open={openCreateClass}
          createroom={createroom}
          onClose={handleClose}
        />
      </Grid>
    </div>
  );
}
