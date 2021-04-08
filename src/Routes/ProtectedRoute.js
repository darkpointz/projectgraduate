import React, { useEffect, useState } from "react";
import Navbar from "../NavigationBar/navbar";
import Login from "../Pages/login";
import LoginByroomName from "../Pages/loginByUserRoomName";
import LanunchStu from "../Pages/lanunchStu";
import { withRouter, Route, Switch } from "react-router-dom";
import NavbarStudent from "../NavigationBar/navbarStudent";
import LoginTeacher from "../Pages/loginTeacher";
import Register from "../Pages/register";
import { classService } from "../Services/classService";

export default function ProtectedRoute({ currentUser, userStudent }) {
  return (
    <>
      <Switch>
        {currentUser ? (
          <Navbar
            displayName={
              currentUser.displayName
                ? currentUser.displayName
                : currentUser.email
            }
            displayPic={currentUser.photoURL}
          />
        ) : (
          <>
            <Route path="/lanunchStu/:reportId/:stuid">
              <LanunchStu />
            </Route>
            <Route path="/login/student/:room">
              <NavbarStudent />
            </Route>
            <Route path="/login/teacher">
              <LoginTeacher />
            </Route>
            <Route path="/register">
              <Register />
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

//----
// {currentUser ? (
//   <Navbar
//     displayName={currentUser.displayName}
//     displayPic={currentUser.photoURL}
//   />
// ) : userStudent ? (
//   <Route path="/LanunchStu/:reportId/:stuid">
//     <LanunchStu />
//   </Route>
// ) : (
//   <>
//     <Route path="/login/student">
//       <NavbarStudent />
//     </Route>
//     <Route path="/login/teacher">
//       <LoginTeacher />
//     </Route>
//     <Route exact path="/">
//       <Login />
//     </Route>
//   </>
// )}
