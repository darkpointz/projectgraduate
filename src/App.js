import React, { useContext } from "react";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import "./index.css";
import Navbar from "./NavigationBar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import Lanunch from "./Page/lanunch";
import Class from "./Page/class";
import Report from "./Page/reports";
import Quiz from "./Page/quiz";
import Login from "./Page/login";
import { AuthProvider, AuthContext } from "./Auth/auth";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  const { currentUser } = useContext(AuthContext);

  return (
    <div className={classes.container}>
      {/* <Login /> */}
      <AuthProvider>{currentUser ? <Navbar /> : <Login />}</AuthProvider>

      {/* <Switch>
      <Route exact from="/" render={props => <Lanunch {...props} />} />
      <Route exact path="/quiz" render={props => <Quiz {...props} />} />
      <Route exact path="/report" render={props => <Report {...props} />} />
      <Route exact path="/room" render={props => <Class {...props} />} />
    </Switch> */}
    </div>
  );
}
