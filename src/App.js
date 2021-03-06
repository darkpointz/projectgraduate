import React, { useState, useEffect } from "react";
import { auth } from "./Auth/firebase";
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import "./index.css";
import Navbar from "./NavigationBar/navbar";
import { makeStyles } from "@material-ui/core/styles";
import Lanunch from "./Pages/lanunch";
import Class from "./Pages/class";
import { authService } from "./Auth/authService";
import Quiz from "./Pages/quiz";
import Login from "./Pages/login";
import axios from "axios";
import jwtDecode from "jwt-decode";

import LanunchStu from "./Pages/lanunchStu";
import LiveResult from "./Pages/liveResult";
import ProtectedRoute from "./Routes/ProtectedRoute";
import AxiosInterceptor from "./Auth/axiosInterceptor";

// import { AuthProvider, AuthContext } from "./Auth/authService";

const useStyles = makeStyles({
  container: {
    display: "flex",
  },
});

export default function App() {
  const classes = useStyles();
  const [currentUser, setcurrentUser] = useState(null);
  const [userStudent, setuserStudent] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setcurrentUser(user);
      const token = localStorage.FBIdToken;
      //เช็คtokenหมดอายุ
      if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          authService.logout();
          window.location.href = "/login/teacher";
        }
        // else {
        //   axios.defaults.headers.common["Authorization"] = token;
        // }
      }
    });
    setuserStudent(localStorage.getItem("userStudent"));
    // const token = localStorage.getItem("FBIdToken");
    // axios.defaults.headers.common["Authorization"] = token;
  }, []);

  return (
    <div className={classes.container}>
      <ProtectedRoute currentUser={currentUser} userStudent={userStudent} />
    </div>
  );
}
