import React, { useState } from "react";
import clsx from "clsx";
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
  RadioButtonUnchecked,
  Delete,
  Edit,
} from "@material-ui/icons";
import DialogDelete from "./dialogDelete";
import Shortanswer from "./shortanswer";
import Truefalse from "./truefalse";
import Multiplechoice from "./multiplechoice";

const useStyles = makeStyles((theme) => ({
  root: {},
  inputbox: {
    display: "flex",
    marginBottom: "24px",
  },
  step: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "20px",
  },
  txtStep: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    fontSize: "16px",
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
  typoTF: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 500,
    backgroundColor: "#00FF08",
    padding: "6px 16px",
    borderRadius: "6px",
    boxShadow:
      "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
    color: "#ffffff",
  },
  typoTrue: { backgroundColor: "#12f729" },
  typoFalse: { backgroundColor: "#fc5353" },
  typoSa: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 400,
    backgroundColor: "#77ff7c",
    padding: "6px 10px",
    marginRight: "8px",
    marginBottom: "8px",
    borderRadius: "6px",
    color: "#ffffff",
  },
}));
const Showquiz = ({ key, list, step, deleteQuiz, savequiz }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [selectEdit, setselectEdit] = useState("");

  const showtf = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit
            className={classes.btnEdit}
            onClick={() => handleClickEdit("tf")}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          {list.correct === "true" ? (
            <Typography
              className={clsx(classes.typoTF, {
                [classes.typoTrue]: list.correct === "true",
              })}
            >
              True
            </Typography>
          ) : (
            <Typography
              className={clsx(classes.typoTF, {
                [classes.typoFalse]: list.correct === "false",
              })}
            >
              False
            </Typography>
          )}
          <Delete className={classes.btnDelete} onClick={handleClickOpenDel} />
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
          <Edit
            className={classes.btnEdit}
            onClick={() => handleClickEdit("sa")}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexWrap="wrap">
            {list.correct.map((item) => (
              <Typography className={classes.typoSa}>{item.ans}</Typography>
            ))}
          </Box>
          <Delete className={classes.btnDelete} onClick={handleClickOpenDel} />
        </Box>
      </Box>
    );
  };
  const showmc = () => {
    let charStep = ["A", "B", "C", "D", "E"];
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit
            className={classes.btnEdit}
            onClick={() => handleClickEdit("mc")}
          />
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {list.choice.map((item, index) => (
              <Box display="flex" alignItems="center">
                <Typography className={classes.txtStep}>
                  {charStep[index]}
                </Typography>
                <Checkbox
                  icon={<RadioButtonUnchecked fontSize="small" />}
                  name="correct"
                  style={{ color: "#6be17a" }}
                  checked={list.correct.includes(item)}
                  // checked={item.correct}
                  checkedIcon={<CheckCircle />}
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
                <Typography>{item}</Typography>
                {/* <Typography>{item.ans}</Typography> */}
              </Box>
            ))}
          </Box>
          <Delete className={classes.btnDelete} onClick={handleClickOpenDel} />
        </Box>
      </Box>
    );
  };

  const handleClickEdit = (type) => {
    setselectEdit(type);
  };

  const handleClickOpenDel = () => {
    setOpen(true);
  };

  const handleConfirmdelete = (value) => {
    deleteQuiz(step);
    setOpen(false);
  };

  const handleCanceldelete = () => {
    setOpen(false);
  };

  const savequizEdit = (quiz) => {
    savequiz(quiz, step - 1);
    setselectEdit("");
  };

  return (
    <div>
      {list.type === "truefalse" && selectEdit === "" ? (
        showtf()
      ) : list.type === "shortanswer" && selectEdit === "" ? (
        showsa()
      ) : list.type === "multiplechoice" && selectEdit === "" ? (
        showmc()
      ) : selectEdit === "sa" ? (
        <Shortanswer
          questionEdit={list.question}
          step={list.step}
          correctQuiz={list.correct}
          savequiz={savequizEdit}
        />
      ) : selectEdit === "tf" ? (
        <Truefalse
          questionEdit={list.question}
          step={list.step}
          correctQuiz={list.correct}
          savequiz={savequizEdit}
        />
      ) : selectEdit === "mc" ? (
        <Multiplechoice
          questionEdit={list.question}
          step={list.step}
          correctQuiz={list.choice}
          savequiz={savequizEdit}
        />
      ) : null}
      <DialogDelete
        open={open}
        confirm={handleConfirmdelete}
        onClose={handleCanceldelete}
      />
      <hr style={{ margin: "12px" }} />
    </div>
  );
};
export default Showquiz;
