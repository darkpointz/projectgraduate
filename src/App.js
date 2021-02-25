import React from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import "./index.css";
import Navbar from "./NavigationBar/navbar";
import initialFirebase from "./Components/initialFirebase";
import { makeStyles } from "@material-ui/core/styles";
import Lanunch from "./Page/lanunch";
import Class from "./Page/class";
import Report from "./Page/reports";
import Quiz from "./Page/quiz";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  // initialFirebase()

  return (
    <div className={classes.container}>
      <Navbar />
      {/* <Switch>
      <Route exact from="/" render={props => <Lanunch {...props} />} />
      <Route exact path="/quiz" render={props => <Quiz {...props} />} />
      <Route exact path="/report" render={props => <Report {...props} />} />
      <Route exact path="/room" render={props => <Class {...props} />} />
    </Switch> */}
    </div>
  );
}
