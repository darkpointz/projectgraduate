import React, { useState } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

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
import DialogChangeclassName from "./dialogChangeclassName";
import { classService } from "../Services/classService";

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
    marginTop: "5px",
    color: "#494944",
  },
}));
export default function CardClass(props) {
  const classes = useStyles();
  const { room, index, Deleteroom, changeRoomName } = props;
  const [opendialogDel, setopendialogDel] = useState(false);
  const [openEditName, setopenEditName] = useState(false);

  const handleDelete = () => {
    swal({
      title: "Please Confirm",
      text: "Are you sure you want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Delete room success!", {
          icon: "success",
        });
        Deleteroom(room.roomId, index);
      }
    });
    //
    // setopendialogDel(false);
  };

  const canceldialog = () => {
    setopendialogDel(false);
  };

  const canceldialogEdit = () => {
    setopenEditName(false);
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

  const handleConfirmEdit = (newName) => {
    const formName = {
      roomName: newName,
    };
    classService
      .changeRoomName(room.roomId, formName)
      .then((res) => {
        setopenEditName(false);
        if (res.data.message === "success") {
          swal("Success!", "Change room name success!", "success");
          changeRoomName(index, newName);
          console.log("res : ", res.data);
        }
      })
      .catch((err) => {
        if (err.response.status == 403) {
          swal("Error!", `The room name ${newName} already exists.!`, "error");
        }
      });
  };

  const handleEditName = () => {
    setopenEditName(true);
  };

  return (
    <>
      <Card className={classes.root}>
        <CardContent className={classes.cardContent}>
          <Box display="flex" alignItems="center">
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {room.roomName}
            </Typography>
            <IconButton aria-label="iconEdit" onClick={handleEditName}>
              <EditTwoTone className={classes.iconEdit} />
            </IconButton>
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
          <IconButton aria-label="iconDelete" onClick={handleDelete}>
            <Delete
              className={classes.btnDelete}
              // onClick={() => setopendialogDel(true)}
              fontSize="large"
            />
          </IconButton>
        </CardActions>
      </Card>
      <DialogDelete
        open={opendialogDel}
        confirm={handleDelete}
        onClose={canceldialog}
      ></DialogDelete>
      <DialogChangeclassName
        open={openEditName}
        confirm={handleConfirmEdit}
        onClose={canceldialogEdit}
        name={room.roomName}
      />
    </>
  );
}
