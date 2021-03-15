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
  const [FBIdToken, setFBIdToken] = useState();
  const [userId, setuserId] = useState();

  useEffect(() => {
    // setFBIdToken(header);
    // axios
    //   .get(`/room/getAllRoom`)
    //   .then((res) => {
    //     console.log(res.data);
    //     setroom(res.data);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });
    const uId = localStorage.getItem("userId");
    console.log("userId: ", uId);
    classService.getAllRoom(uId).then((res) => {
      setroom(res);
      setuserId(uId);
      console.log("res: ", res);
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

    // axios.post("/room/insertRoom", formroom).then((response) => {
    //   newroom.roomId = response.data.message;
    //   console.log(response.data.message);
    //   setroom([...room, newroom]);
    // });
    classService.insertRoom(formroom, userId).then((res) => {
      newroom.roomId = res;
      setroom([...room, newroom]);
      swal("Success!", "Create room success!", "success");
    });
    setOpenCreateClass(false);
  };

  const handleDeleteroom = (roomId, index) => {
    let newroom = [...room];
    newroom.splice(index, 1);
    setroom(newroom);
    axios
      .delete(`/room/deleteRoomByRoomId/${roomId}`)
      .then((response) => console.log(response.status));
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
          {room.map((room, index) => {
            return (
              <CardClass
                key={room.roomId}
                room={room}
                index={index}
                Deleteroom={handleDeleteroom}
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