import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Quiz from "../Page/quiz";
import { BrowserRouter, Route, NavLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Navbar() {
  const classes = useStyles();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Launch" />
        <Tab label="QUIZZES" containerElement={<NavLink to="/first"/>} />
        <Tab label="ROOMS" />
        <Tab label="REPORTS" />
        <Tab label="RESULTS" />
      </Tabs>
    </Paper>
  );
}
// <BrowserRouter>
    //   <div>
    //     <ul>
    //       <li>
    //         <NavLink to="/quiz">QuizForm</NavLink>
    //       </li>
    //     </ul>
    //     <Route path="/quiz" component={Quiz}></Route>
    //   </div>
    // </BrowserRouter>
