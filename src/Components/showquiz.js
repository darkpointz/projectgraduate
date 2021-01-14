import React, { useState } from "react";
import {
  Checkbox,
  Button,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";
import { display } from "@material-ui/system";
import {
  CheckCircle,
  CheckCircleOutline,
  Delete,
  Edit,
} from "@material-ui/icons";

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
}));
const Showquiz = ({ list }) => {
  const classes = useStyles();

  const showtf = () => {
    return (
      <Box display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between">
          <Typography className={classes.step}>
            {list.step}. {list.question}
          </Typography>
          <Edit></Edit>
        </Box>
        <Box display="flex" justifyContent="space-between">
          {list.correct === "true" ? (
            <Typography>true</Typography>
          ) : (
            <Typography>false</Typography>
          )}
          <Delete></Delete>
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
          <Edit></Edit>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {list.correct.map((item) => (
              <Typography>{item.ans}</Typography>
            ))}
          </Box>
          <Delete></Delete>
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
          <Edit></Edit>
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
          <Delete></Delete>
        </Box>
      </Box>
    );
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
        {/* <h1>{list.step}</h1>
        <h2>{list.question}</h2>
        {list.arrayans.map((list) => (
          <h3>{list}</h3>
        ))} */}
      </div>
      <hr />
    </div>
  );
};
export default Showquiz;
