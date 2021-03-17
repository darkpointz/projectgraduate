import React, { useState, useEffect } from "react";
import { auth } from "./Auth/firebase";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import "./index.css";
import Navbar from "./NavigationBar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import Lanunch from "./Pages/lanunch";
import Class from "./Pages/class";
import Report from "./Pages/reports";
import Quiz from "./Pages/quiz";
import Login from "./Pages/login";
import axios from "axios";
import LanunchStu from "./Pages/lanunchStu";

// import { AuthProvider, AuthContext } from "./Auth/authService";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  const [currentUser, setcurrentUser] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      console.log("usesdsdr: ", user);
    });
    const token = localStorage.getItem("FBIdToken");
    axios.defaults.headers.common["Authorization"] = token;
  }, []);

  return (
    <div className={classes.container}>
      {/* {currentUser ? (
        <Navbar
          displayName={currentUser.displayName}
          displayPic={currentUser.photoURL}
        />
      ) : (
        <Login />
      )} */}

      {/* ลองมือถือ */}
      {/* <Navbar displayName={"aod"} displayPic={"/static/images/avatar/2.jpg"} /> */}

      <LanunchStu />

      {/* <Switch>
      <Route exact from="/" render={props => <Lanunch {...props} />} />
      <Route exact path="/quiz" render={props => <Quiz {...props} />} />
      <Route exact path="/report" render={props => <Report {...props} />} />
      <Route exact path="/room" render={props => <Class {...props} />} />
    </Switch> */}
    </div>
  );
}
