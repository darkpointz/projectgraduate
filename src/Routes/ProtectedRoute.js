import React from "react";
import Navbar from "../NavigationBar/navbar";
import Login from "../Pages/login";
import LanunchStu from "../Pages/lanunchStu";
import { Route, Switch } from "react-router-dom";
import NavbarStudent from "../NavigationBar/navbarStudent";
import LoginTeacher from "../Pages/loginTeacher";

export default function ProtectedRoute({ currentUser }) {
  return (
    <>
      <Switch>
        {currentUser ? (
          <Navbar
            displayName={currentUser.displayName}
            displayPic={currentUser.photoURL}
          />
        ) : (
          <>
            <Route path="/lanunchStu/:reportId/:stuid">
              <LanunchStu />
            </Route>
            <Route path="/login/student">
              <NavbarStudent />
            </Route>
            <Route path="/login/teacher">
              <LoginTeacher />
            </Route>
            <Route exact path="/">
              <Login />
            </Route>
          </>
        )}
      </Switch>
    </>
  );
}