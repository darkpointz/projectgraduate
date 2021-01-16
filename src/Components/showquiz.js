import React, { useState } from "react";

import {
  Checkbox,
  Button,
  Box,
  Typography,
  makeStyles,
  Dialog,
} from "@material-ui/core";
import { display } from "@material-ui/system";
import {
  CheckCircle,
  CheckCircleOutline,
  Delete,
  Edit,
} from "@material-ui/icons";
import DialogDelete from "./dialogDelete";

const useStyles = makeStyles((theme) => ({
  root: {},
  inputbox: {
    display: "flex",
    marginBottom: "24px",
  },
  step: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "24px",
  },
  btnDelete: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  btnEdit: {
    "&:hover": {
      cursor: "pointer",
    },
  },
}));
const Showquiz = ({ key, list, step, deleteQuiz }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectDelete, setselectDelete] = useState(false)

  const showtf = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit className={classes.btnEdit} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          {list.correct === "true" ? (
            <Typography>true</Typography>
          ) : (
              <Typography>false</Typography>
            )}
          <Delete className={classes.btnDelete} onClick={handleClickOpen} />
        </Box>
      </Box>
    );
  };
  const showsa = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit className={classes.btnEdit} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {list.correct.map((item) => (
              <Typography>{item.ans}</Typography>
            ))}
          </Box>
          <Delete className={classes.btnDelete} onClick={handleClickOpen} />
        </Box>
      </Box>
    );
  };
  const showmc = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit className={classes.btnEdit} />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {list.choice.map((item) => (
              <Box display="flex">
                <Checkbox
                  icon={<CheckCircleOutline fontSize="small" />}
                  name="correct"
                  checked={item.correct}
                  checkedIcon={<CheckCircle />}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Typography>{item.ans}</Typography>
              </Box>
            ))}
          </Box>
          <Delete className={classes.btnDelete} onClick={handleClickOpen} />
        </Box>
      </Box>
    );
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    if (value === "1") {
      deleteQuiz(step)
    }
  };

  return (
    <div>
      <div>
        {console.log(list)}
        {/* <h2>{list.step}. {list.question}</h2> */}
        {list.type === "truefalse"
          ? showtf()
          : list.type === "shortanswer"
            ? showsa()
            : list.type === "multiplechoice"
              ? showmc()
              : null}
        <DialogDelete open={open} onClose={handleClose} />
      </div>
      <hr />
    </div>
  );
};
export default Showquiz;
