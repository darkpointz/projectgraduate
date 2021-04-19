import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";
import { Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  typoTime: {
    fontFamily: "'Prompt', sans-serif",
    fontWeight: 600,
    fontSize: "26px",
  },
  iconTime: {
    fontSize: "32px",
    marginRight: "12px",
  },
}));
export default function CountDownTime({ counter, handleEndTime }) {
  const classes = useStyles();
  const cookies = new Cookies();
  const [count, setcount] = useState(counter);
  // const [count, setcount] = useState(cookies.get("countTime"));
  useEffect(() => {
    // count > 0 && setTimeout(() => handleEndTime(counter - 1), 1000);
    count > 0 && setTimeout(() => setcount(count - 1), 1000);
  }, [count]);
  return (
    <div className={classes.root}>
      <AccessAlarmIcon className={classes.iconTime} />
      <Typography className={classes.typoTime}>
        Time Countdown: {count} sec
      </Typography>
    </div>
  );
}
